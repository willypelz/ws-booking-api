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
  // // @Get(':slug/comments')
  // // async findComments(@Param('slug') slug): Promise<CommentsRO> {
  // //   return await this.bookingService.findComments(slug);
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
  // // @ApiOperation({ summary: 'Create comment' })
  // // @ApiResponse({ status: 201, description: 'The comment has been successfully created.'})
  // // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // // @Post(':slug/comments')
  // // async createComment(@Param('slug') slug, @Body('comment') commentData: CreateCommentDto) {
  // //   return await this.bookingService.addComment(slug, commentData);
  // // }
  //
  // @ApiOperation({ summary: 'Delete comment' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/comments/:id')
  // async deleteComment(@Param() params) {
  //   const {slug, id} = params;
  //   return await this.bookingService.deleteComment(slug, id);
  // }
  //
  // @ApiOperation({ summary: 'Favorite booking' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully favorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Post(':slug/favorite')
  // async favorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.bookingService.favorite(userId, slug);
  // }
  //
  // @ApiOperation({ summary: 'Unfavorite booking' })
  // @ApiResponse({ status: 201, description: 'The booking has been successfully unfavorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/favorite')
  // async unFavorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.bookingService.unFavorite(userId, slug);
  // }

}
