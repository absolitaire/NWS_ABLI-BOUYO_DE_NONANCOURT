import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ChannelService } from './channel.service';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody, ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';
import { HandlerParams } from './validators/handler-params';
import { ChannelInterceptor } from './interceptors/channel.interceptor';

@ApiUseTags('back/channel')
@Controller('channel')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ChannelInterceptor)
export class ChannelController {
  constructor(private readonly _channelService: ChannelService) {}
  @Get('/mdr')
  getHello(@Param('id') params: string): string {
    return this._channelService.getHello() + params;
  }

  /**
   * Handler to answer to GET /people route
   *
   * @returns Observable<PersonEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of channels', type: ChannelEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No person exists in database' })
  @Get()
  findAll(): Observable<ChannelEntity[] | void> {
    return this._channelService.findAll();
  }

  /**
   * Handler to answer to GET /people/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<PersonEntity>
   */
  @ApiOkResponse({ description: 'Returns the person for the given "id"', type: ChannelEntity })
  @ApiNotFoundResponse({ description: 'Person with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the person in the database', type: String })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ChannelEntity> {
    return this._channelService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /people route
   *
   * @param createChannelDto data to create
   *
   * @returns Observable<PersonEntity>
   */
  @ApiCreatedResponse({ description: 'The person has been successfully created', type: ChannelEntity })
  @ApiConflictResponse({ description: 'The person already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @Post()
  create(@Body() createChannelDto: CreateChannelDto): Observable<ChannelEntity> {
    return this._channelService.create(createChannelDto);
  }

}
