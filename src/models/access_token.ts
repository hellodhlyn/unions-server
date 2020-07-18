import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import User from './user';

@Entity('access_tokens')
export default class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessKey: string;

  @Column()
  refreshKey: string;

  @Column()
  accessExpireAt: Date;

  @Column()
  refreshExpireAt: Date;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  accessExpired(): boolean {
    return this.accessExpireAt.getTime() < new Date().getTime();
  }

  refreshExpired(): boolean {
    return this.refreshExpireAt.getTime() < new Date().getTime();
  }
}
