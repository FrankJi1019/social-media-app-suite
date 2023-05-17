import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Friend } from '../../friend/entities/friend.entity';

@Entity()
export class Character extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Moment, (moment) => moment.character)
  moments: Array<Moment>;

  @OneToMany(() => Comment, (comment) => comment.character)
  comments: Array<Comment>;

  @OneToMany(() => Friend, (friend) => friend.userCharacter)
  friends: Array<Friend>;

  @OneToMany(() => Friend, (friend) => friend.friendCharacter)
  _friends: Array<Friend>;
}
