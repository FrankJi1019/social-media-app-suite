import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Friend } from '../../friend/entities/friend.entity';
import { Moment } from '../../moment/entities/moment.entity';

@Entity('account')
export class Account extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @OneToMany(() => Moment, (moment) => moment.account)
  moments: Array<Moment>;

  @OneToMany(() => Friend, (friend) => friend.userAccount)
  friends: Array<Friend>;

  @OneToMany(() => Friend, (friend) => friend.friendAccount)
  _friends: Array<Friend>;
}
