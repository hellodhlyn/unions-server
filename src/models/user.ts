import {
  Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import Union from './union';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Union, (union) => union.users)
  unions: Union[];

  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
