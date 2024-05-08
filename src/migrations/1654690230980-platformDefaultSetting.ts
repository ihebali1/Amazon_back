import { MigrationInterface, QueryRunner } from 'typeorm';

export class platformDefaultSetting1654690230980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `gain` (`id`, `description`, `percentage`, `type`, `createdAt`, `updatedAt`) VALUES (UUID(), 'Represen',10 ,'TRANSACTION' ,DEFAULT, DEFAULT)",
    );

    await queryRunner.query(
      "INSERT INTO `vat` (`id`, `percentage`, `type`, `createdAt`, `updatedAt`) VALUES (UUID(),10 ,'TRANSACTION' ,DEFAULT, DEFAULT)",
    );

    await queryRunner.query(
      "INSERT INTO `vat` (`id`, `percentage`, `type`, `createdAt`, `updatedAt`) VALUES (UUID(),5 ,'TRANSPORT' ,DEFAULT, DEFAULT)",
    );

    await queryRunner.query(
      "INSERT INTO `shipping_cost` (`id`, `amount`, `type`, `createdAt`, `updatedAt`) VALUES (UUID(),10 ,'SAME_ZONE' ,DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `shipping_cost` (`id`, `amount`, `type`, `createdAt`, `updatedAt`) VALUES (UUID(),20 ,'DIFFERENT_ZONE' ,DEFAULT, DEFAULT)",
    );

    await queryRunner.query(
      "INSERT INTO `subscription` (`id`, `description`, `kind`, `price`, `createdAt`, `updatedAt`) VALUES (UUID(),'Pay per product', 'INDIVIDUAL', 10,DEFAULT, DEFAULT)",
    );

    await queryRunner.query(
      "INSERT INTO `subscription` (`id`, `description`, `kind`, `price`, `createdAt`, `updatedAt`) VALUES (UUID(),'Monthly subscription', 'PROFESSIONAL', 10,DEFAULT, DEFAULT)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
