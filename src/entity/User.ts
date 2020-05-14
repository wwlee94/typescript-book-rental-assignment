import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rental } from './Rental';

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

  // column으로 생성 안되도록
  // @Column({ select: false })
  // @Exclude()
  @IsString()
  @IsNotEmpty()
  passwordConfirm!: string;

  // User(1) <-> Rental(*)
  @OneToMany(type => Rental, rental => rental.user)
  rentals!: Rental[];
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
