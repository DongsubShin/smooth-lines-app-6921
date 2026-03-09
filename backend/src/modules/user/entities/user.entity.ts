import { Entity, Column, Index, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Client } from '../../client/entities/client.entity';

export enum UserRole {
  ADMIN = 'admin',
  BARBER = 'barber',
  CLIENT = 'client',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'full_name' })
  fullName: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @OneToOne(() => Barber, (barber) => barber.user)
  barberProfile?: Barber;

  @OneToOne(() => Client, (client) => client.user)
  clientProfile?: Client;
}