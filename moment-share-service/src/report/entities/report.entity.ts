import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { Account } from '../../account/entities/account.entity';

@Entity('report')
export class Report extends BaseEntity {
  @Column()
  reason: string;

  @ManyToOne(() => Moment, (moment) => moment.reports)
  moment: Moment;

  @ManyToOne(() => Account, (account) => account.reports)
  reporter: Account;
}
