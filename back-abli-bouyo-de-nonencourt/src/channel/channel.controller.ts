import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post, UseInterceptors } from '@nestjs/common';
import { ChannelService } from './channel.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';
import { HandlerParams } from './validators/handler-params';
import { ChannelInterceptor } from './interceptors/channel.interceptor';
import { SubscriptionDto } from './dto/subscription.dto';
import { flatMap } from 'rxjs/operators';

@ApiUseTags('back/channel')
@Controller('channel')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ChannelInterceptor)
export class ChannelController {
  constructor(private readonly _channelService: ChannelService, private readonly _logger: Logger) {}

  /**
   * Handler to answer to GET /channel route
   *
   * @returns Observable<ChannelEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of channels', type: ChannelEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No channel exists in database' })
  @Get()
  findAll(): Observable<ChannelEntity[] | void> {
    return this._channelService.findAll();
  }

  /**
   * Handler to answer to GET /channel/:id route
   *
   * @param {HandlerParams} params list of route params to take channel id
   *
   * @returns Observable<ChannelEntity>
   */
  @ApiOkResponse({ description: 'Returns the channel for the given "id"', type: ChannelEntity })
  @ApiNotFoundResponse({ description: 'Channel with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the channel in the database', type: String })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ChannelEntity> {
    return this._channelService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /channel route
   *
   * @param createChannelDto data to create
   *
   * @returns Observable<ChannelEntity>
   */
  @ApiCreatedResponse({ description: 'The channel has been successfully created', type: ChannelEntity })
  @ApiConflictResponse({ description: 'The channel already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @Post()
  create(@Body() createChannelDto: CreateChannelDto): Observable<ChannelEntity> {
    return this._channelService.create(createChannelDto);
  }

  /**
   * Handler to answer to POST /channel/subscribe route
   *
   * @param SubscriptionDto data to create
   *
   * @returns Observable<ChannelEntity>
   */
  @ApiCreatedResponse({ description: 'The user has been subscribed'})
  @ApiConflictResponse({ description: 'The user is already subscribed' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  // @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the channel in the database', type: String })
  // @ApiImplicitParam({ name: 'idUser', description: 'Unique identifier of the user in the database', type: String })
  // @Post(':id/subscribe/:idUser')
  // subscribeAccountToChannel(@Param() params: SubscriptionParams): Observable<ChannelEntity>{
  @Post('subscribe')
  subscribeAccountToChannel(@Body() sub: SubscriptionDto): Observable<ChannelEntity>{
    this._logger.log(`AYYYYY ${sub.idChannel}`);
    const res = this._channelService.subscribe(sub);
    // this._logger.log(from(res));
    return res;
  }
  /**
   * Handler to answer to POST /channel/unsubscribe route
   *
   * @param SubscriptionDto data to create
   *
   * @returns Observable<ChannelEntity>
   */
  @ApiNoContentResponse({ description: 'The user has been successfully unsubscribed' })
  @ApiNotFoundResponse({ description: 'The user or the channel doesn\'t exist '})
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @Delete('unsubscribe')
  unsubscribeAccountToChannel(@Body() sub: SubscriptionDto): Observable<ChannelEntity>{
    return this._channelService.unsubscribe(sub);
  }
}
