import {
  Entity,
  Column,
  VersionColumn,
  Unique,
  PrimaryColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Notification } from '../notification/notification.entity';

@Unique(['username'])
@Entity()
export class User {
  @Column({
    name: 'id',
    nullable: false,
  })
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @VersionColumn()
  version: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: true,
  })
  createAt: Date | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToOne(() => Notification, (notification) => notification.user)
  notification: Notification;
}
