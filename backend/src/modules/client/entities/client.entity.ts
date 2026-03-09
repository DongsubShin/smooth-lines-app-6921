import { Entity, Column, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Notification } from '../../notification/entities/notification.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @OneToOne(() => User, (user) => user.clientProfile, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Index()
  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'visit_count', default: 0 })
  visitCount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];
}