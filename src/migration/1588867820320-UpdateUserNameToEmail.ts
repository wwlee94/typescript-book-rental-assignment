import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserNameToEmail1588867820320 implements MigrationInterface {
    name = 'UpdateUserNameToEmail1588867820320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `email` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `name` varchar(255) NOT NULL", undefined);
    }

}
