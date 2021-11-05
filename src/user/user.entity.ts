import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import {BookingEntity} from "../booking/booking.entity";
import {AgentEntity} from "../agent/agent.entity";

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(type => BookingEntity, booking => booking.id)
  @JoinTable()
  bookings: BookingEntity[];

  @OneToMany(type => AgentEntity, agent => agent.id)
  @JoinTable()
  agent: BookingEntity[];
}
