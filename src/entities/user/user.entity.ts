import { 
    Entity,
    Column,
    PrimaryGeneratedColumn, 
    VersionColumn, 
    Unique, 
    OneToMany,
    JoinColumn
} from 'typeorm';
import { Product } from '../product/product.entity';

@Unique(['username'])
@Entity()
export class User {
  @Column({
    name: 'id',
    nullable: false,
    })
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => Product, product => product.user)
  products: Product[];
}