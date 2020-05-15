/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Rental } from './Rental';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  author!: string;

  @Column({ default: false })
  isRental!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // Book(1) <-> Rental(1)
  @OneToMany(type => Rental, rental => rental.book)
  rentals!: Rental[];
}
