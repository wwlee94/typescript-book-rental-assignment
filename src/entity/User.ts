import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password!: string;

  // entity에 추가 안하면서 find에서 출력 안되도록?
  // @Column({ select: false })
  // @Exclude()
  @IsString()
  @IsNotEmpty()
  passwordConfirm!: string;
}

export class UserAuth {
  @Column()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
