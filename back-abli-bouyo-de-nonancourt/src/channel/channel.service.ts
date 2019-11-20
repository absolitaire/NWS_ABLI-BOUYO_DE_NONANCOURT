import { ConflictException, ImATeapotException, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { from, Observable, of, throwError } from 'rxjs';
import { ChannelEntity } from './entities/channel.entity';
import { catchError, flatMap, map } from 'rxjs/operators';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelDao } from './dao/channel.dao';
import { SubscriptionDto } from './dto/subscription.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserDao } from '../user/dao/user.dao';
import { MessageEntity } from './entities/message.entity';
import { FindMessagesDto } from './dto/find-messages.dto';
import { RichMessageEntity } from './entities/richmessage.entity';
import cryptoRandomString = require('crypto-random-string');

@Injectable()
export class ChannelService {

  constructor(private readonly _channelDao: ChannelDao,
              private readonly _userDao: UserDao,
              private readonly _logger: Logger,
  ) {
  }

  /**
   * Returns all existing people in the list
   *
   * @returns {Observable<ChannelEntity[] | void>}
   */
  findAll(): Observable<ChannelEntity[] | void> {
    return this._channelDao.findAllChannels()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ChannelEntity(__)) : undefined),
      );
  }

  /**
   * Returns one channel of the list matching id in parameter
   *
   * @param {string} id of the channel
   *
   * @returns {Observable<ChannelEntity>}
   */

  findOne(id: string): Observable<ChannelEntity> {
    return this._channelDao.findChannelById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ChannelEntity(_)) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Returns one channel of the list matching id in parameter
   *
   * @param {string} id of the channel
   *
   * @returns {Observable<ChannelEntity>}
   */

  findOneByIdChannel(id: string): Observable<ChannelEntity> {
    return this._channelDao.findChannelByIdChannel(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ChannelEntity(_)) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }
  /**
   * Return messages from target channel.
   *
   * @param query with the id of the channel and the parameters.
   *
   * @returns {Observable<ChannelEntity>}
   */
  async findMessagesOnChannel(query: FindMessagesDto): Promise<MessageEntity[] | void> {
    return this._channelDao.findMessagesOnChannel(query);
  }
  /**
   * Return populated messages from target channel.
   *
   * @param query with the id of the channel and the parameters.
   *
   * @returns {Observable<ChannelEntity>}
   */
  async findPopulatedMessagesOnChannel(query: FindMessagesDto): Promise<RichMessageEntity[] | void> {
    return this._channelDao.findPopulatedMessagesOnChannel(query);
  }
  /**
   * Returns all channels that target user is subscribed to.
   *
   * @param id of user
   *
   * @returns {Observable<ChannelEntity[] | void>}
   */
  findSubscribedChannelsOfUser(id: string): Observable<ChannelEntity[] | void> {
    return from(this._channelDao.findSubscribedChannelsOfUser(id))
      .pipe(
        map(_ => !!_ ? _.map(__ => new ChannelEntity(__)) : undefined),
      );
  }

  /**
   * Check if channel already exists and creates it.
   *
   * @param channel to create
   *
   * @returns {Observable<ChannelEntity>}
   */
  create(channel: CreateChannelDto): Observable<ChannelEntity> {
    return this._addChannel(channel)
      .pipe(
        flatMap(_ => this._channelDao.createChannel(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`A channel with the id '${channel.idChannel}' already exists`, e.message),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ChannelEntity(_)),
      );
  }

  /**
   * Delete one channel.
   * Called when a channel doesn't have any users subscribed anymore.
   *
   * @param {string} id of the channel to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._channelDao.findChannelByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }
  /**
   * Checks if the target users exists; and if so, subscribe the user to the target channel.
   *
   * @param channel subscribed
   * @param subscribing user
   *
   * @returns {Observable<void>}
   */
  tryToSubscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
    return this._userDao.findById(sub.idUser)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.subscribe(sub) :
            throwError(new NotFoundException(`User with id '${sub.idChannel}' doesn't exist`)),
        ),
      );

  }

  /**
   * Subscribe the user to the target channel.
   *
  * @param channel subscribed
   * @param subscribing user
   *
   * @returns {Observable<void>}
   */
  subscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
    return this._channelDao.subscribe(sub)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new ConflictException(`Channel with id '${sub.idChannel}' don't exists or user'${sub.idUser}' is already subscribed to this channel`)),
        ),
      );

  }

  /**
   * Checks if the channel is empty, and if so, deletes it.
   *
   * @param channel subscribed
   *
   * @returns {Observable<ChannelEntity>}
   */

  tryToDeleteChannel(sub: SubscriptionDto): Observable<ChannelEntity> {
    return this._channelDao.tryToDeleteChannel(sub.idChannel)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.subscribe(sub) :
            throwError(new ImATeapotException('Channel successfully deleted')),
        ),
      );

  }

  unsubscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
    return this._channelDao.unsubscribe(sub)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.tryToDeleteChannel(sub) :
            throwError(new NotFoundException(`User with id '${sub.idUser}' or channel with id '${sub.idChannel}'not found`)),
        ),
      );

  }

  writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity> {
    return this._channelDao.writeIntoChannel(message)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
        ),
      );
  }

  tryToWriteIntoChannel(message: CreateMessageDto): Observable<ChannelEntity> {
    return this._userDao.findById(message.idUser)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.writeIntoChannel(message) :
            throwError(new NotFoundException(`User with id '${message.idUser}' doesn't exist`)),
        ),
      );

  }

  /**
   * Add channel with good data in database
   *
   * @param channel to add
   *
   * @returns {Observable<CreateChannelDto>}
   *
   * @private
   */
  private _addChannel(channel: CreateChannelDto): Observable<CreateChannelDto> {
    return of(channel).pipe(
      map(_ =>
        Object.assign(_,
          {
            idChannel: cryptoRandomString({ length: 5, type: 'url-safe' }),
          },
          Object.assign({}, _),
        ),
      ));
  }

}
