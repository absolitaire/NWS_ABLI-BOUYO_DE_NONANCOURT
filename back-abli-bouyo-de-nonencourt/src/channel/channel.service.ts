import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { from, Observable, of, throwError } from 'rxjs';
import { ChannelEntity } from './entities/channel.entity';
import { catchError, map, flatMap, find, tap } from 'rxjs/operators';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelDao } from './dao/channel.dao';
import { Channel } from './interfaces/channel.interface';

@Injectable()
export class ChannelService {

  private kkk: Channel[];
  constructor(private readonly _channelDao: ChannelDao) {
    this.kkk = [];
  }

  getHello(): string {
    return 'Hello World channel!';
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

 /* findAll(): Observable<ChannelEntity[] | void> {
    return of(this.kkk)
      .pipe(
        map(_ => !!_ ? _.map(__ => new ChannelEntity(__)) : undefined),
      );
  }*/
  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person
   *
   * @returns {Observable<PersonEntity>}
   */
/*  findOne(id: string): Observable<Channel> {
    return from(this.kkk)
      .pipe(
        find(_ => _.id === id),
        flatMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`People with id '${id}' not found`)),
        ),
      );
  }*/
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
   * Check if person already exists and add it in people list
   *
   * @param person to create
   *
   * @returns {Observable<ChannelEntity>}
   */

/*  create(person: CreateChannelDto): Observable<Channel> {
    return from(this.kkk)
      .pipe(
        find(_ => _.idChannel === person.idChannel),
        flatMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`People with lastname already exists`),
            ) :
            this._addChannel(person),
        ),
      );
  }*/
  create(channel: CreateChannelDto): Observable<ChannelEntity> {
    return this._addChannel(channel)
      .pipe(
        flatMap(_ => this._channelDao.createChannel(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`A channel with the id '${channel.idChannel}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ChannelEntity(_)),
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
  /*private _addChannel(channel: CreateChannelDto): Observable<CreateChannelDto> {
    return of(channel);
  }*/
  private _addChannel(channel: CreateChannelDto): Observable<Channel> {
    return of(channel).pipe(
      map(_ =>
        Object.assign(_, {
          id: this._createId(),
        }) as Channel,
      ),
      tap(_ => this.kkk = this.kkk.concat(_)),
    );
  }
  private _createId(): string {
    return `${new Date().getTime()}`;
  }
  /**
   * Deletes one person in people list
   *
   * @param {string} id of the person to delete
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
            throwError(new NotFoundException(`Person with id '${id}' not found`)),
        ),
      );
  }

}
