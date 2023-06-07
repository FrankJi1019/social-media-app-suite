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
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Tag')
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  @Query('tags')
  findAll() {
    return this.tagService.findAll();
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createTag')
  createTag(@Args('input') input: CreateTagInput) {
    return this.tagService.createTag(input.name, input.category);
  }

  @ResolveField('category')
  findCategory(@Parent() { id }: { id: number }) {
    return this.tagService.findCategoryByTagId(id);
  }
}
