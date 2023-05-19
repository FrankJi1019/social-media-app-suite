import { BaseEntity } from './base.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseService<T extends BaseEntity> {
  protected constructor(private readonly genericRepository: Repository<T>) {}

  async findAll(filterOptions: FindManyOptions<T> = {}): Promise<Array<T>> {
    return await this.genericRepository.find(filterOptions);
  }

  async findOne(filterOptions: FindOneOptions<T> = {}): Promise<T> {
    return await this.genericRepository.findOne(filterOptions);
  }

  async findById(
    id: number | string,
    options: FindOneOptions<T> = {},
  ): Promise<T> {
    const entity = await this.genericRepository.findOne({
      where: { id } as FindOptionsWhere<T>,
      ...options,
    });
    if (entity) {
      return entity;
    } else {
      throw new NotFoundException(`Entity with id ${id} does not exist`);
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    try {
      return this.genericRepository.create(data).save();
    } catch (e) {
      throw e;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    if (!(await this.exists(id))) {
      throw new NotFoundException();
    }
    const entity = await this.findById(id);
    const deletedMoment = await this.genericRepository.remove(entity);
    deletedMoment.id = id;
    return true;
  }

  async exists(id: number): Promise<boolean> {
    return this.genericRepository.exist({
      where: { id } as FindOptionsWhere<T>,
    });
  }
}
