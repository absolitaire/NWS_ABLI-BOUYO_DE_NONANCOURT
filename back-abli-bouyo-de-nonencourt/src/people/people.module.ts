import { Logger, Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './schemas/person.schema';
import { PeopleDao } from './dao/people.dao';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Person', schema: PersonSchema } ]) ],
  controllers: [ PeopleController ],
  providers: [ PeopleService, Logger, PeopleDao ],
})
export class PeopleModule {
}
