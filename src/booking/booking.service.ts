import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, DeleteResult} from 'typeorm';
import {BookingEntity} from './booking.entity';
import {UserEntity} from '../user/user.entity';
import {FollowsEntity} from '../profile/follows.entity';
import {CreateBookingDto} from './dto';

import {BookingRO, BookingsRO} from './booking.interface';

const slug = require('slug');

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async findAll(query): Promise<BookingsRO> {

    const qb = await getRepository(BookingEntity)
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.userId', 'userId');

    qb.where("1 = 1");


    qb.orderBy('booking.created', 'DESC');

    const bookingsCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const bookings = await qb.getMany();

    return {bookings, bookingsCount};
  }


  async findOne(where): Promise<BookingRO> {
    const booking = await this.bookingRepository.findOne(where);
    return {booking};
  }

  //
  // async addComment(slug: string, commentData): Promise<ArticleRO> {
  //   let booking = await this.bookingRepository.findOne({slug});
  //
  //   const comment = new Comment();
  //   comment.body = commentData.body;
  //
  //   booking.comments.push(comment);
  //
  //   await this.commentRepository.save(comment);
  //   booking = await this.bookingRepository.save(booking);
  //   return {booking}
  // }
  //
  // async deleteComment(slug: string, id: string): Promise<ArticleRO> {
  //   let booking = await this.bookingRepository.findOne({slug});
  //
  //   const comment = await this.commentRepository.findOne(id);
  //   const deleteIndex = booking.comments.findIndex(_comment => _comment.id === comment.id);
  //
  //   if (deleteIndex >= 0) {
  //     const deleteComments = booking.comments.splice(deleteIndex, 1);
  //     await this.commentRepository.delete(deleteComments[0].id);
  //     booking =  await this.bookingRepository.save(booking);
  //     return {booking};
  //   } else {
  //     return {booking};
  //   }
  //
  // }
  //
  // async favorite(id: number, slug: string): Promise<ArticleRO> {
  //   let booking = await this.bookingRepository.findOne({slug});
  //   const user = await this.userRepository.findOne(id);
  //
  //   const isNewFavorite = user.favorites.findIndex(_booking => _booking.id === booking.id) < 0;
  //   if (isNewFavorite) {
  //     user.favorites.push(booking);
  //     booking.favoriteCount++;
  //
  //     await this.userRepository.save(user);
  //     booking = await this.bookingRepository.save(booking);
  //   }
  //
  //   return {booking};
  // }
  //
  // async unFavorite(id: number, slug: string): Promise<ArticleRO> {
  //   let booking = await this.bookingRepository.findOne({slug});
  //   const user = await this.userRepository.findOne(id);
  //
  //   const deleteIndex = user.favorites.findIndex(_booking => _booking.id === booking.id);
  //
  //   if (deleteIndex >= 0) {
  //
  //     user.favorites.splice(deleteIndex, 1);
  //     booking.favoriteCount--;
  //
  //     await this.userRepository.save(user);
  //     booking = await this.bookingRepository.save(booking);
  //   }
  //
  //   return {booking};
  // }
  //
  // async findComments(slug: string): Promise<CommentsRO> {
  //   const booking = await this.bookingRepository.findOne({slug});
  //   return {comments: booking.comments};
  // }
  //
  async create(userId: number, bookingData: CreateBookingDto): Promise<BookingEntity> {

    let booking = new BookingEntity();
    booking.startDate = bookingData.startDate;
    booking.finishDate = bookingData.finishDate;

    return await this.bookingRepository.save(booking);
  }

  // async update(slug: string, bookingData: any): Promise<ArticleRO> {
  //   let toUpdate = await this.bookingRepository.findOne({ slug: slug});
  //   let updated = Object.assign(toUpdate, bookingData);
  //   const booking = await this.bookingRepository.save(updated);
  //   return {booking};
  // }
  //
  // async delete(slug: string): Promise<DeleteResult> {
  //   return await this.bookingRepository.delete({ slug: slug});
  // }
  //
  // slugify(title: string) {
  //   return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  // }
}
