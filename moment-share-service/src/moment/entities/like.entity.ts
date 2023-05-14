import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Moment } from './moment.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity('like')
@Index('USER_LIKE_UNIQUE', ['username', 'moment.id'], { unique: true })
export class Like extends BaseEntity {
  @Column()
  username: string;

  @ManyToOne(() => Moment, (moment) => moment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moment_id' })
  moment: Moment;
}
