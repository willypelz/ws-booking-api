import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ArticleEntity } from '../article/article.entity';
import {BookingEntity} from "../booking/booking.entity";
import {AgentEntity} from "../agent/agent.entity";

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(type => BookingEntity, booking => booking.id)
  @JoinTable()
  bookings: BookingEntity[];

  @OneToMany(type => AgentEntity, agent => agent.id)
  @JoinTable()
  agent: BookingEntity[];
}
