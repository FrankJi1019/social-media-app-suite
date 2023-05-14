import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Character } from './entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService extends BaseService<Character> {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {
    super(characterRepository);
  }
}
