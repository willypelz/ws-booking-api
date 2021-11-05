import { UserData } from '../user/user.interface';
import { BookingEntity } from './booking.entity';

interface BookingData {
  startDate?: Date
  finishDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface BookingRO {
  booking: BookingEntity;
}

export interface BookingsRO {
  bookings: BookingEntity[];
  bookingsCount: number;
}

