import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Character')
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query('characters')
  findAll() {
    return this.characterService.findAll();
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createCharacter')
  create(@Args('name') name: string) {
    return this.characterService.create({ name });
  }
}
