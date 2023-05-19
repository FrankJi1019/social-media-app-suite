import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Friend } from '../../friend/entities/friend.entity';
import { Moment } from '../../moment/entities/moment.entity';
import { Like } from '../../moment/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('account')
export class Account extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @OneToMany(() => Moment, (moment) => moment.account)
  moments: Array<Moment>;

  @OneToMany(() => Like, (like) => like.account)
  likes: Array<Like>;

  @OneToMany(() => Comment, (comment) => comment.account)
  comments: Array<Comment>;

  @OneToMany(() => Chat, (chat) => chat.sender)
  messagesSent: Array<Chat>;

  @OneToMany(() => Chat, (chat) => chat.receiver)
  messagesReceived: Array<Chat>;

  @OneToMany(() => Friend, (friend) => friend.userAccount)
  friends: Array<Friend>;

  @OneToMany(() => Friend, (friend) => friend.friendAccount)
  _friends: Array<Friend>;
}
