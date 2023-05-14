import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Category } from '../../category/entities/category.entity';
import { Moment } from '../../moment/entities/moment.entity';

@Entity('tag')
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.tags)
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToMany(() => Moment, (moment) => moment.tags)
  moments: Array<Moment>;
}
