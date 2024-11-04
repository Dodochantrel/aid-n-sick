import { Controller, Get } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.entity';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getAll(): Promise<People[]> {
    return this.peopleService.getAll();
  }
}
