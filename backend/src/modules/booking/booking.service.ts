import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    const client = await this.clientRepo.findOne({ where: { userId } });
    if (!client) throw new NotFoundException('Client profile not found');

    const booking = this.bookingRepo.create({
      ...dto,
      clientId: client.id,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepo.save(booking);
  }

  async findAll(query: any) {
    return this.bookingRepo.find({
      where: query,
      relations: ['barber', 'client', 'service'],
      order: { scheduledAt: 'DESC' },
    });
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.bookingRepo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    
    booking.status = dto.status;
    return this.bookingRepo.save(booking);
  }
}