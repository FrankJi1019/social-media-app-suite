import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Like } from './like.entity';
import { Character } from '../../character/entities/character.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity('moment')
export class Moment extends BaseEntity {
  @Column()
  username: string;

  @Column()
  content: string;

  @ManyToOne(() => Character, (character) => character.moments, {
    onDelete: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'character' })
  character: Character;

  @OneToMany(() => Like, (like) => like.moment)
  likes: Array<Like>;

  @OneToMany(() => Comment, (comment) => comment.moment)
  comments: Array<Comment>;

  @ManyToMany(() => Tag, (tag) => tag.moments)
  @JoinTable({
    name: 'moment_tags',
    joinColumn: {
      name: 'moment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Array<Tag>;
}
