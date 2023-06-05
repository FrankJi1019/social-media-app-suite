import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { Account } from '../../account/entities/account.entity';

@Entity('report')
export class Report extends BaseEntity {
  @Column()
  reason: string;

  @ManyToOne(() => Moment, (moment) => moment.reports)
  @JoinColumn({ name: 'moment' })
  moment: Moment;

  @ManyToOne(() => Account, (account) => account.reports)
  @JoinColumn({ name: 'reporter-account' })
  reporter: Account;
}
