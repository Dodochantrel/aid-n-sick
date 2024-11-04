import { Controller, Get } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getAll(): string {
    return this.peopleService.getAll();
  }
}
