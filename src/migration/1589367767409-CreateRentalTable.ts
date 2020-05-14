import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRentalTable1589367767409 implements MigrationInterface {
    name = 'CreateRentalTable1589367767409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rental` DROP COLUMN `roomId`", undefined);
        await queryRunner.query("ALTER TABLE `rental` DROP FOREIGN KEY `FK_79c5e75e6d3b8cab309347ff4c3`", undefined);
        await queryRunner.query("ALTER TABLE `rental` CHANGE `bookId` `bookId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `rental` CHANGE `returnDateAt` `returnDateAt` timestamp NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `rental` ADD CONSTRAINT `FK_79c5e75e6d3b8cab309347ff4c3` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rental` DROP FOREIGN KEY `FK_79c5e75e6d3b8cab309347ff4c3`", undefined);
        await queryRunner.query("ALTER TABLE `rental` CHANGE `returnDateAt` `returnDateAt` timestamp NULL", undefined);
        await queryRunner.query("ALTER TABLE `rental` CHANGE `bookId` `bookId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `rental` ADD CONSTRAINT `FK_79c5e75e6d3b8cab309347ff4c3` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `rental` ADD `roomId` int NOT NULL", undefined);
    }

}
