import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Notification {
  @Column({
    name: 'id',
    nullable: false,
  })
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  expoAppToken: string;

  @OneToOne(() => User, (user) => user.notification)
  user: User;
}
