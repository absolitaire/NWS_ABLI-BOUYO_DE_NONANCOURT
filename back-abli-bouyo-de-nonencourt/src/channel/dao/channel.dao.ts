import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Channel } from '../interfaces/channel.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateChannelDto } from '../dto/create-channel.dto';

@Injectable()
export class ChannelDao {
  /**
   * Class constructor
   *
   * @param {Model<Channel>} _channelModel instance of the model representing a Channel
   */
  constructor(@InjectModel('Channel') private readonly _channelModel: Model<Channel>) {
  }
  /**
   * Call mongoose method, call toJSON on each result and returns Person[] or undefined
   *
   * @return {Observable<Channel[] | void>}
   */
  findAllChannels(): Observable<Channel[] | void> {
    return from(this._channelModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }
/*  findAllChannels(): Observable<Channel[] | void> {
    return from(this._channelModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : ''undefined''),
      );
  }*/
  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person in the db
   *
   * @return {Observable<Channel | void>}
   */
  findChannelById(id: string): Observable<Channel | void> {
    return from(this._channelModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Create a new Channel
   *
   * @param {Channel} person to create
   *
   * @return {Observable<CreateChannelDto>}
   */
  createChannel(channel: CreateChannelDto): Observable<Channel> {
    return from(this._channelModel.create(channel))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Delete a channel. Called only when a channel is empty
   *
   * @param {string} id
   *
   * @return {Observable<Channel | void>}
   */
  findChannelByIdAndRemove(id: string): Observable<Channel | void> {
    return from(this._channelModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
