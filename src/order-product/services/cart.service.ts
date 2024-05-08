import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { State } from 'src/countries/entities/state.entity';
import { DealProduct } from 'src/offer/entities/deal-product.entity';
import { Deals } from 'src/offer/entities/promotional-offer.entity';
import { BuyableProduct, Variation, ParentListing } from 'src/products/entities/product.entity';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { ShippingCostTypeEnum } from 'src/shipping-cost/enums/shipping-cost-type.enum';
import { ShippingCostRepository } from 'src/shipping-cost/repositories/shipping-cost.repository';
import { Vendor } from 'src/users/entities/users.entity';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { RemoveFromCartDto } from '../dto/remove-from-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { CartRepository } from '../repositories/cart.repository';
import { CartItemRepository } from '../repositories/cartItem.repository';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private buyableProductRepository: BuyableProductRepository,
    private cartItemRepository: CartItemRepository,
    private shippingCostRepository: ShippingCostRepository,
  ) {}
  create(clientId: string) {
    const cart = new Cart();
    cart.client = clientId;
    return this.cartRepository.save(cart);
  }
  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: string) {
    return this.cartRepository.findOne(id, {
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  async findOneByUserId(id: string) {
    const fetchedCart = await this.cartRepository.findCartFullDetailsByClientId(
      id,
    );
    for (const cartItem of fetchedCart.cartItems as CartItem[]) {
      const product = cartItem.product as BuyableProduct;
      let productPrice = product.price;
      //@TODO() refactor use dealService instead
      for (const dealProduct of product.dealProducts as DealProduct[]) {
        if (
          (dealProduct.deal as Deals).startDate <= new Date() &&
          (dealProduct.deal as Deals).endDate >= new Date()
        ) {
          productPrice = dealProduct.dealPrice;
          break;
        }
      }
      (cartItem.product as BuyableProduct).price = productPrice;
    }
    return fetchedCart;
  }

  async getShippingCost(id: string, stateId: string) {
    const cart = await this.cartRepository.findCartFullDetailsByClientId(id);
    const shippingCosts = [];
    const sameStateShippingCost = await this.shippingCostRepository.findOne({
      type: ShippingCostTypeEnum.SAME_ZONE,
    });
    const differentStateShippingCost =
      await this.shippingCostRepository.findOne({
        type: ShippingCostTypeEnum.DIFFERENT_ZONE,
      });
    for (const cartItem of cart.cartItems as CartItem[]) {
      let isFound = false;
      for (const shippingCost of shippingCosts) {
        if ((cartItem.product as BuyableProduct).vendor != null) {
          if (
            ((shippingCost.vendor as Vendor).id as string) ==
            (((cartItem.product as BuyableProduct).vendor as Vendor).id as string)
          ) {
            isFound = true;
            shippingCost.products.push(cartItem.product as BuyableProduct);
          }
        }
        if ((cartItem.product as BuyableProduct).vendor == null) {
          if (
            ((shippingCost.vendor as Vendor).id as string) ==
            ((
              ((cartItem.product as Variation).parentListing as ParentListing)
                .vendor as Vendor
            ).id as string)
          ) {
            isFound = true;
            shippingCost.products.push(cartItem.product as BuyableProduct);
          }
        }
      }
      if (isFound == false) {
        let vendorState = null;
        let vendor = null;
        if ((cartItem.product as BuyableProduct).vendor != null) {
          vendorState = ((cartItem.product as BuyableProduct).vendor as Vendor)
            .businessState as State;
          vendor = (cartItem.product as BuyableProduct).vendor;
        }

        if ((cartItem.product as BuyableProduct).vendor == null) {
          vendorState = (
            ((cartItem.product as Variation).parentListing as ParentListing)
              .vendor as Vendor
          ).businessState as State;
          vendor = (
            (cartItem.product as Variation).parentListing as ParentListing
          ).vendor as Vendor;
        }

        if (vendorState.id == stateId) {
          const shippCost = new ShippingCost();
          shippCost.cost = sameStateShippingCost.amount;
          shippCost.vendor = vendor;
          shippCost.shippingFrom = vendorState.name;
          shippCost.products.push(cartItem.product as BuyableProduct);
          shippingCosts.push(shippCost);
        }

        if (vendorState.id != stateId) {
          const shippCost = new ShippingCost();
          shippCost.cost = differentStateShippingCost.amount;
          shippCost.vendor = vendor;
          shippCost.shippingFrom = vendorState.name;
          shippCost.products.push(cartItem.product as BuyableProduct);
          shippingCosts.push(shippCost);
        }
      }
    }
    return shippingCosts;
  }

  async addProduct(id: string, addTocartDto: AddToCartDto) {
    console.log(id);
    try {
      const cart = await this.cartRepository.findCartFullDetailsByClientId(id);
      console.log(cart);
      const product = await this.buyableProductRepository.findOne(
        addTocartDto.product,
      );
      //@TODO fix stock check
      if (product.quantity - addTocartDto.quantity < 0)
        throw new HttpException('الكمية المطلوبة أكبر من كمية المنتج', 452);
      let productExist = false;
      for (const cartItem of cart.cartItems) {
        const itemProduct = (cartItem as CartItem).product as BuyableProduct;
        if (
          product.quantity - (addTocartDto.quantity + addTocartDto.quantity) <
          0
        )
          throw new HttpException('الكمية المطلوبة أكبر من كمية المنتج', 452);
        if (itemProduct.id == product.id) {
          (cartItem as CartItem).quantity += addTocartDto.quantity;
          productExist = true;
          return this.cartItemRepository.save(cartItem as CartItem);
        }
      }
      if (productExist == false) {
        const cartItem = new CartItem();
        cartItem.quantity = addTocartDto.quantity;
        cartItem.product = addTocartDto.product;
        cartItem.cart = cart;
        return this.cartItemRepository.save(cartItem);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async removeProduct(id: string, removeFromcartDto: RemoveFromCartDto) {
    try {
      const cart = await this.cartRepository.findCartFullDetailsByClientId(id);
      console.log(cart);
      const product = await this.buyableProductRepository.findOne(
        removeFromcartDto.product,
      );
      for (const cartItem of cart.cartItems) {
        const itemProduct = (cartItem as CartItem).product as BuyableProduct;
        if (itemProduct.id == product.id) {
          return this.cartItemRepository.remove(cartItem as CartItem);
        }
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async increaseQuantity(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.findOneByUserId(id);
    console.log(cart);
    const product = await this.buyableProductRepository.findOne(updateCartDto.product);
    for (const cartItem of cart.cartItems) {
      const itemProduct = (cartItem as CartItem).product as BuyableProduct;
      if (itemProduct.id == product.id) {
        (cartItem as CartItem).quantity++;
        return this.cartItemRepository.save(cartItem as CartItem);
      }
    }
  }

  async decreaseQuantity(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.findOneByUserId(id);
    console.log(cart);
    const product = await this.buyableProductRepository.findOne(updateCartDto.product);
    for (const cartItem of cart.cartItems) {
      const itemProduct = (cartItem as CartItem).product as BuyableProduct;
      if (itemProduct.id == product.id) {
        if ((cartItem as CartItem).quantity > 1) {
          (cartItem as CartItem).quantity--;
        } else {
          return this.cartItemRepository.remove(cartItem as CartItem);
        }

        return this.cartItemRepository.save(cartItem as CartItem);
      }
    }
  }

  async remove(id: string) {
    try {
      const savedItems = await this.findOne(id);
      return this.cartRepository.remove(savedItems);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

export class ShippingCost {
  vendor!: Vendor;
  cost: number;
  shippingFrom: string;
  products: BuyableProduct[] = [];
}
