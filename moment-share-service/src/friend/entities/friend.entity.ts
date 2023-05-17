import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Account } from '../../account/entities/account.entity';
import { Character } from '../../character/entities/character.entity';

@Entity('friend')
export class Friend extends BaseEntity {
  @Column({ default: false })
  hasUnread: boolean;

  @ManyToOne(() => Account, (account) => account.friends)
  @JoinColumn({ name: 'user_account' })
  userAccount: Account;

  @ManyToOne(() => Character, (character) => character.friends)
  @JoinColumn({ name: 'user_character' })
  userCharacter: Character;

  @ManyToOne(() => Account, (account) => account._friends)
  @JoinColumn({ name: 'friend_account' })
  friendAccount: Account;

  @ManyToOne(() => Character, (character) => character._friends)
  @JoinColumn({ name: 'friend_character' })
  friendCharacter: Character;
}
