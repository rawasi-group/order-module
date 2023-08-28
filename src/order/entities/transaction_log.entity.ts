import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: string;

  @Column()
  state: string;

  @Column({ type: 'json' })
  data: string;
}
