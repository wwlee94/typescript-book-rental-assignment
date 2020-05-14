import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  bookId!: number;

  // Rental(*) <-> User(1)
  @ManyToOne(type => User, user => user.rentals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  // Rental(1) <-> Book(1)
  @OneToOne(type => Book, book => book.rental)
  @JoinColumn({ name: 'bookId' })
  book!: Book;

  // 대여 일자
  @CreateDateColumn({ type: 'timestamp' })
  rentalDateAt!: Date;

  // 반납 일자
  @Column({ type: 'timestamp', default: null })
  returnDateAt!: Date;
}
