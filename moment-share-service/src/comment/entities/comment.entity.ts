import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Character } from '../../character/entities/character.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { BaseEntity } from '../../base/base.entity';
import { Account } from '../../account/entities/account.entity';

@Entity('comment')
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Account, (account) => account.comments)
  @JoinColumn({ name: 'account' })
  account: Account;

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
