import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction_log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @Column({ type: 'text' })
  response: string;
}
