import { Column } from 'typeorm';

export class BusinessAdress {
  @Column()
  adressLine: string;

  @Column()
  adressLine2: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;
}
