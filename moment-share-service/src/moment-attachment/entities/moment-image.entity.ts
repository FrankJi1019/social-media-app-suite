import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';

@Entity('moment-image')
export class MomentImage extends BaseEntity {
  @Column()
  order: number;

  @Column()
  link: string;

  @ManyToOne(() => Moment, (moment) => moment.images)
  @JoinColumn({ name: 'moment' })
  moment: Moment;
}
