import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { Request } from 'express';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
import {BookingRO, BookingsRO} from './booking.interface';
import { User } from '../user/user.decorator';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
export class BookingController {

  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings.'})
  @Get()
  async findAll(@Query() query): Promise<BookingsRO> {
    return await this.bookingService.findAll(query);
  }

  //
  // @Get(':slug')
  // async findOne(@Param('slug') slug): Promise<BookingRO> {
  //   return await this.bookingService.findOne({slug});
  // }
  //
  // // @Get(':slug/bookings')
  // // async findBookings(@Param('slug') slug): Promise<BookingsRO> {
  // //   return await this.bookingService.findBookings(slug);
  // // }
  //
  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 201, description: 'The booking has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('booking') bookingData: CreateBookingDto) {
    return this.bookingService.create(userId, bookingData);
  }

  // @ApiOperation({ summary: 'Update booking' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully updated.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Put(':slug')
  // async update(@Param() params, @Body('booking') bookingData: CreateBookingDto) {
  //   // Todo: update slug also when title gets changed
  //   return this.bookingService.update(params.slug, bookingData);
  // }
  //
  // @ApiOperation({ summary: 'Delete booking' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug')
  // async delete(@Param() params) {
  //   return this.bookingService.delete(params.slug);
  // }
  // //
  // // @ApiOperation({ summary: 'Create booking' })
  // // @ApiResponse({ status: 201, description: 'The booking has been successfully created.'})
  // // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // // @Post(':slug/bookings')
  // // async createBooking(@Param('slug') slug, @Body('booking') bookingData: CreateBookingDto) {
  // //   return await this.bookingService.addBooking(slug, bookingData);
  // // }
  //
  // @ApiOperation({ summary: 'Delete booking' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/bookings/:id')
  // async deleteBooking(@Param() params) {
  //   const {slug, id} = params;
  //   return await this.bookingService.deleteBooking(slug, id);
  // }
  //

}
