import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaListRepository } from 'src/lists/repositories/ideaList.repository';
import { RegistryRepository } from 'src/lists/repositories/registry.repository';
import { SavedItemsRepository } from 'src/lists/repositories/savedItems.repository';
import { WishListRepository } from 'src/lists/repositories/wishList.repository';
import { CartRepository } from 'src/order-product/repositories/cart.repository';
import { RegisterUserDto } from 'src/register/dto/register-user.dto';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateInfoDto } from '../dto/update-info.dto';
import { Adress } from '../entities/adress.entity';
import { Client, Users } from '../entities/users.entity';
import { IUsers } from '../interfaces/users.interface';
import { AdressRepository } from '../repositories/address.repository';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Users)
    private readonly clientRepository: ClientRepository,
    private readonly ideaListRepository: IdeaListRepository,
    private readonly wishListRepository: WishListRepository,
    private readonly savedItemsRepository: SavedItemsRepository,
    private readonly cartRepository: CartRepository,
    private readonly registryRepository: RegistryRepository,
    private readonly adressRepository: AdressRepository,
  ) {}

  async findClientFullInfo(clientId: string) {
    return this.clientRepository.findClientFullDetails(clientId);
  }

  async findAll() {
    return this.clientRepository.find();
  }

  public async find(userId: string): Promise<Users> {
    const user = await this.clientRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['ideaLists', 'adresses'],
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    delete user.password;
    return user;
  }

  public async findClientById(userId: string): Promise<Users> {
    const user = await this.clientRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['adresses','adresses.state', 'creditCards'],
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }
  public async findById(userId: string, relation: string): Promise<Users> {
    const user = await this.clientRepository.findOne({
      where: {
        id: userId,
      },
      relations: [relation],
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async findByEmail(email: string): Promise<Users> {
    const user = await this.clientRepository.findOne({
      where: {
        email: email,
      },
      select: ['password', 'email', 'id', 'firstName', 'lastName'],
    });

    if (!user) {
      throw new NotFoundException(
        `هذا البريد الإلكتروني لا يطابق أي حساب في نظامنا`,
      );
    }

    return user;
  }

  public async addIdeaList(id: string, ideaListId: string) {
    try {
      const client = (await this.find(id)) as Client;
      const ideaList = await this.ideaListRepository.findOne(ideaListId);
      client.ideaLists.push(ideaList);
      await this.clientRepository.save(client);
      return this.find(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async add_WishList(id: string, wishListId: string) {
    try {
      const client = (await this.findById(id, 'wishLists')) as Client;
      const wishList = await this.wishListRepository.findOne(wishListId);
      client.wishLists.push(wishList);
      const update = await this.clientRepository.save(client);
      return this.findById(id, 'wishLists');
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async add_SavedItems(id: string, savedItemsId: string) {
    try {
      const client = (await this.findById(id, 'savedItems')) as Client;
      const savedItem = await this.savedItemsRepository.findOne(savedItemsId);
      client.savedItems = savedItem;
      const update = await this.clientRepository.save(client);
      return this.findById(id, 'savedItems');
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async add_Cart(id: string, cartId: string) {
    try {
      const client = (await this.findById(id, 'cart')) as Client;
      const cart = await this.cartRepository.findOne(cartId);
      client.cart = cart;
      const update = await this.clientRepository.save(client);
      return this.findById(id, 'cart');
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async add_Registry(id: string, RegistryId: string) {
    try {
      const client = (await this.findById(id, 'registries')) as Client;
      const registry = await this.registryRepository.findOne(RegistryId);
      client.registries.push(registry);
      const update = await this.clientRepository.save(client);
      return this.findById(id, 'registries');
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async isEmailExist(email: string): Promise<boolean> {
    const user = await this.clientRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  public async create(userDto: RegisterUserDto): Promise<IUsers> {
    return await this.clientRepository.save(userDto);
  }

  async updateInfo(clientId: string, updateInfoDto: UpdateInfoDto) {
    return this.clientRepository.update(clientId, updateInfoDto);
  }

  async addAddressToClient(
    clientId: string,
    createAddressDto: CreateAddressDto,
  ) {
    const newAdress = new Adress();
    newAdress.firstName = createAddressDto.firstName;
    newAdress.lastName = createAddressDto.lastName;
    newAdress.aptNumber = createAddressDto.aptNumber;
    newAdress.city = createAddressDto.city;
    newAdress.state = createAddressDto.state;
    newAdress.streetAddress = createAddressDto.streetAddress;
    newAdress.postalCode = createAddressDto.postalCode;
    newAdress.client = clientId;
    return this.adressRepository.save(newAdress);
  }

  async removeAddressFromClient(clientId: string, addressId: string) {
    const fetchedAddress = await this.adressRepository.findOne(
      {
        id: addressId,
        client: clientId,
      },
      { relations: ['client'] },
    );
    if (!fetchedAddress) throw new NotFoundException('address not found');

    await this.adressRepository.update(fetchedAddress, { client: null });
    return this.adressRepository.remove(fetchedAddress);
  }

  updateStatus(id: string, isActive: boolean) {
    this.clientRepository.update(id, { isActive: isActive });
  }
}
