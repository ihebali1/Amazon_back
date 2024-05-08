import { SimpleProduct, ParentListing } from 'src/products/entities/product.entity';
import { Transporter, Users, Vendor } from 'src/users/entities/users.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  OneToMany,
} from 'typeorm';


@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @Column({ select: false })
  originalname: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column({ select: false })
  destination: string;

  @Column()
  protected_url: string;

  @Column()
  public_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setFileUrls() {
    if (!this.protected_url) {
      this.protected_url = `/files/${this.filename}/download`;
    }

    if (!this.public_url) {
      this.public_url = `/public/uploads/${this.filename}`;
    }
  }

  @ManyToOne(() => Users, (user) => user.files)
  createdBy: IUsers | string;

  @ManyToOne(() => SimpleProduct, (simpleproduct) => simpleproduct.images)
  simpleproduct: SimpleProduct | string;

  @ManyToOne(() => Transporter, (transporter) => transporter.driveLicence)
  transporterDocument: Transporter | string;

  @ManyToOne(() => ParentListing, (parentlisting) => parentlisting.images)
  parentlisting: ParentListing | string;

  @OneToMany(() => Vendor, (vendor) => vendor.identityBack)
  identityBackVendors: Vendor[];

  @OneToMany(() => Vendor, (vendor) => vendor.identityFront)
  identityFrontVendors: Vendor[];

  @OneToMany(() => Vendor, (vendor) => vendor.statementDocument)
  statementVendors: Vendor[];
}
