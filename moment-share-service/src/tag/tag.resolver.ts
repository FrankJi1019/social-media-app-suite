import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagInput } from './dto/create-tag.input';

@Resolver('Tag')
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  @Query('tags')
  findAll() {
    return this.tagService.findAll();
  }

  @Mutation('createTag')
  createTag(@Args('input') input: CreateTagInput) {
    return this.tagService.createTag(input.name, input.category);
  }

  @ResolveField('category')
  findCategory(@Parent() { id }: { id: number }) {
    return this.tagService.findCategoryByTagId(id);
  }
}
