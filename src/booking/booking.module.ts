import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { UserEntity } from '../user/user.entity';
import { BookingService } from './booking.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity]), UserModule],
  providers: [BookingService],
  controllers: [
    BookingController
  ]
})
export class BookingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'bookings/feed', method: RequestMethod.GET},
        {path: 'bookings', method: RequestMethod.POST},
        {path: 'bookings/:slug', method: RequestMethod.DELETE},
        {path: 'bookings/:slug', method: RequestMethod.PUT}
      )
  }
}
