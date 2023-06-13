import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class Product {
  @Column({
    name: 'id',
    nullable: false,
  })
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'product_name',
    nullable: false,
  })
  productName: string;

  @Column({
    name: 'category_Id',
    nullable: false,
  })
  categoryId: number;

  @Column({
    name: 'category_name',
    nullable: false,
  })
  categoryName: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    name: 'price',
  })
  price: number;

  @Column({
    name: 'status',
    nullable: false,
    default: true,
  })
  status: boolean;

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
}
