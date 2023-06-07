import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  findAllCategories() {
    return this.categoryService.findAll();
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createCategory')
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create({
      ...input,
      name: input.name.toLowerCase(),
    });
  }

  @ResolveField('tags')
  findTags(@Parent() { id }: { id: number }) {
    return this.categoryService.findAllTags(id);
  }
}
