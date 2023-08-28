import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  state: string;

  @Column()
  type: string;

  @Column({ type: 'json' })
  data: string;
}
