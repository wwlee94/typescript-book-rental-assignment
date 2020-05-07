import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntity1588080503685 implements MigrationInterface {
  name = 'InitEntity1588080503685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `author` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`', undefined);
    await queryRunner.query('DROP TABLE `book`', undefined);
  }
}
