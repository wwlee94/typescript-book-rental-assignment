/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
