import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private repository: Repository<People>,
  ) {}

  getAll(): Promise<People[]> {
    return this.repository.find();
  }
}
