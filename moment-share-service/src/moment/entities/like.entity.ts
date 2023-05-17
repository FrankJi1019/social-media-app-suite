import { Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Moment } from './moment.entity';
import { BaseEntity } from '../../base/base.entity';
import { Account } from '../../account/entities/account.entity';

@Entity('like')
@Index('USER_LIKE_UNIQUE', ['account.id', 'moment.id'], { unique: true })
export class Like extends BaseEntity {
  @ManyToOne(() => Account, (account) => account.likes)
  @JoinColumn({ name: 'account' })
  account: Account;

  @ManyToOne(() => Moment, (moment) => moment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moment' })
  moment: Moment;
}
