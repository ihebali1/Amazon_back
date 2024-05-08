import { MigrationInterface, QueryRunner } from 'typeorm';

export class PermissionDefaultData1653918480565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-SELLER', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-CUSTOMER', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-PRODUCT', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'VIEW-PLATFORM-REVENUE', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-REPORT', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-PAYOUT', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-CONTENT', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-BRAND', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-AD', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-ORDER', DEFAULT, DEFAULT)",
    );
    await queryRunner.query(
      "INSERT INTO `permission` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (UUID(), 'MANAGE-TRANSPORTER', DEFAULT, DEFAULT)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
