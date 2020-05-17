import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // Rental(*) <-> User(1)
  @ManyToOne(type => User, user => user.rentals, { onDelete: 'CASCADE' })
  user!: User;

  // Rental(1) <-> Book(1)
  @ManyToOne(type => Book, book => book.rentals, { onDelete: 'CASCADE' })
  book!: Book;

  // 대여 일자
  @CreateDateColumn({ type: 'timestamp' })
  rentalDateAt!: Date;

  // 반납 일자
  @Column({ type: 'timestamp', default: null })
  returnDateAt!: Date;
}
