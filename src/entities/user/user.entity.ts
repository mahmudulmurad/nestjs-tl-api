import { Entity, Column, VersionColumn, Unique, PrimaryColumn } from 'typeorm';

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
}
