import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Character } from '../../character/entities/character.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity('comment')
export class Comment extends BaseEntity {
  @Column()
  username: string;

  @Column()
  content: string;

  @ManyToOne(() => Moment, (moment) => moment.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moment' })
  moment: Moment;

  @ManyToOne(() => Character, (character) => character.comments, {
    onDelete: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'character' })
  character: Character;
}
