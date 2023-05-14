import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity('category')
export class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Tag, (tag) => tag.category)
  tags: Array<Tag>;
}
