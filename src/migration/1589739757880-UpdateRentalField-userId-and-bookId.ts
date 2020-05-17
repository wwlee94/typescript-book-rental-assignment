import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRentalFieldUserIdAndBookId1589739757880 implements MigrationInterface {
    name = 'UpdateRentalFieldUserIdAndBookId1589739757880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rental` CHANGE `returnDateAt` `returnDateAt` timestamp NULL DEFAULT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rental` CHANGE `returnDateAt` `returnDateAt` timestamp NULL", undefined);
    }

}
