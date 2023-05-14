import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class TagService extends BaseService<Tag> {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(tagRepository);
  }

  async createTag(name: string, categoryName: string) {
    let category: Category | undefined;
    if (categoryName) {
      category = await this.categoryRepository.findOne({
        where: { name: categoryName.toLowerCase() },
      });
      if (!category) {
        throw new NotFoundException();
      }
    }
    return await this.create({ name: name.toLowerCase(), category });
  }

  async findCategoryByTagId(tagId: number) {
    return (
      await this.tagRepository.findOne({
        where: { id: tagId },
        relations: { category: true },
      })
    ).category;
  }
}
