import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Character extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Moment, (moment) => moment.character)
  moments: Array<Moment>;

  @OneToMany(() => Comment, (comment) => comment.character)
  comments: Array<Moment>;
}
