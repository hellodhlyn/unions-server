import {
  Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

import Union from './union';

@Entity('users')
@ObjectType()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  uuid: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true })
  description: string;

  @ManyToMany(() => Union, (union) => union.users)
  unions: Union[];

  @CreateDateColumn()
  @Column()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
