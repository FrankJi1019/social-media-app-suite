import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';

@Entity('moment-image')
export class MomentImage extends BaseEntity {
  @Column()
  order: number;

  @ManyToOne(() => Moment, (moment) => moment.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moment' })
  moment: Moment;
}
