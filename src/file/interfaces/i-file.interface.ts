import { IProduct } from 'src/products/interfaces/product.interface';
import { IUsers } from 'src/users/interfaces/users.interface';

export interface IFile {
  id: string;

  mimetype: string;

  filename: string;

  originalname: string;

  extension: string;

  size: number;

  destination: string;

  createdAt: Date;

  updatedAt: Date;

  createdBy: IUsers | string;

  product: IProduct | string;
}
