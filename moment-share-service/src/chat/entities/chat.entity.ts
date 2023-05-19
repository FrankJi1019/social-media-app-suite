import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Account } from '../../account/entities/account.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Account, (account) => account.messagesSent)
  @JoinColumn({ name: 'sender' })
  sender: Account;

  @ManyToOne(() => Account, (account) => account.messagesReceived)
  @JoinColumn({ name: 'receiver' })
  receiver: Account;
}
