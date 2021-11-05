import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeUpdate,
  JoinTable
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {BookingEntity} from "../booking/booking.entity";

@Entity('booking')
export class AgentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(BookingEntity => BookingEntity, booking => booking.id)
  @JoinTable()
  booking: BookingEntity[];

  @OneToMany(UserEntity => UserEntity, user => user.id)
  @JoinTable()
  user: UserEntity[];
}
