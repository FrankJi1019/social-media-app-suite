import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';

@Resolver('Character')
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query('characters')
  findAll() {
    return this.characterService.findAll();
  }

  @Mutation('createCharacter')
  create(@Args('name') name: string) {
    return this.characterService.create({ name });
  }
}
