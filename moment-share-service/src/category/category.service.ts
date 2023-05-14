import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    super(categoryRepository);
  }

  findAllTags(id: number) {
    return this.tagRepository.find({
      where: { category: { id } },
    });
  }
}
