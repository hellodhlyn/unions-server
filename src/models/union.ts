import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import User from './user';

@Entity('unions')
export default class Union {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.unions, { eager: true })
  @JoinTable({
    name: 'union_member_relations', joinColumn: { name: 'union_id' }, inverseJoinColumn: { name: 'member_id' },
  })
  users: User[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
