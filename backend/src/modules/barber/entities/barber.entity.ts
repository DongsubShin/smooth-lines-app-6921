import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('barbers')
export class Barber extends BaseEntity {
  @OneToOne(() => User, (user) => user.barberProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column('text', { array: true, default: '{}' })
  specialties: string[];

  @Column({ type: 'jsonb', name: 'working_hours', nullable: true })
  workingHours: any; // Format: { monday: { start: '09:00', end: '18:00' }, ... }

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];
}