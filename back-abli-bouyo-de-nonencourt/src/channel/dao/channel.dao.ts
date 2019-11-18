import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Channel, UserId } from '../interfaces/channel.interface';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UserDto } from '../dto/user.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class ChannelDao {
  /**
   * Class constructor
   *
   * @param {Model<Channel>} _channelModel instance of the model representing a Channel
   */
  constructor(@InjectModel('Channel') private readonly _channelModel: Model<Channel>,
              @InjectModel('UserId') private readonly _userIdModel: Model<UserId>,
              private readonly _logger: Logger) {
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

  /**
   * Delete a channel. Called only when a channel is empty
   *
   * @param {string} id
   *
   * @return {Observable<Channel | void>}
   */
  subscribe(sub: SubscriptionDto): Observable<Channel | void> {
    this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findOneAndUpdate({ _id: sub.idChannel, usersSubscribed:{$nin: sub.idUser } }, {$push: {usersSubscribed: sub.idUser}} ))

    .pipe(
      map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
    );
      // .pipe(
      //
      //
      //   ,
      //
      //   this._logger.log(`EN  VRAI CEST LA FIN `),
      //   return chan,
      // )
      //
  }
}
/*  subscribe(sub: SubscriptionDto): Observable<Channel | void> {
    this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findById({ _id: sub.idChannel },
      (err, chan) => {
        if (err) {
          this._logger.log(err.message);
          this._logger.log(`EN  VRAI CEST LA PANIQUE`);
          return undefined;
        }
        this._logger.log(`EN  VRAI CEST LA genendj ${chan.usersSubscribed} lel`);

        if(chan.usersSubscribed === undefined){
          this._logger.log(`EN  VRAI CEST LA creation `);
          chan.usersSubscribed = [sub.idUser];
        }else{
          this._logger.log(`EN  VRAI CEST LA remontada `);
          chan.usersSubscribed.push(sub.idUser);
        }

        this._logger.log(`EN  VRAI CEST LA FIN `);
        return chan.save();
      }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
}*/
/*  subscribe(sub: SubscriptionDto): Observable<Channel | void> {
    this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findById({_id: sub.idChannel},
      async (err, chan) => {
        if (err) {this._logger.log(err.message);
          this._logger.log(`EN  VRAI CEST LA PANIQUE`);
          return undefined; }
        let user = await this._userIdModel.findById(sub.idUser)
        if(!!user){
          this._logger.log(`EN  VRAI CEST LA creation `);
          user = await this._userIdModel.create({ _id: sub.idUser});
        }

        this._logger.log(`EN  VRAI CEST LA genendj `);
        chan.usersSubscribed.push(user);
        this._logger.log(`EN  VRAI CEST LA remontada `);
      }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
}*/
/*  subscribe(sub: SubscriptionDto): Observable<Channel | void> {
    this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findById({_id: sub.idChannel},
       (err, chan) => {
        if (err) {this._logger.log(err.message);
          this._logger.log(`EN  VRAI CEST LA PANIQUE`);
          return undefined; }
        //const user = await this._userIdModel.create({ _id: sub.idUser});
        this._logger.log(`EN  VRAI CEST LA genendj `);
        chan.usersSubscribed.push([{'_id': '28'}]);
        this._logger.log(`EN  VRAI CEST LA remontada `);
      }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
}*/
/*  subscribe(sub: SubscriptionDto): Observable<Channel | void> {
    this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findById({_id: sub.idChannel},
      async (err, chan) => {
      if (err) {this._logger.log(err.message);
        this._logger.log(`EN  VRAI CEST LA PANIQUE`);
        return undefined; }
      const user = await this._userIdModel.create({ _id: sub.idUser});
        this._logger.log(`EN  VRAI CEST LA genendj `);
      chan.usersSubscribed.push(user);
       this._logger.log(`EN  VRAI CEST LA remontada `);
    }))
      .pipe(
       map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
}*/
/*
subscribe(sub: SubscriptionDto): Observable<Channel | void> {
  this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
return from(this._channelModel.findById({_id: sub.idChannel},
  async (err, chan) => {
    if (err) {this._logger.log(err.message);
      this._logger.log(`EN  VRAI CEST LA PANIQUE`);
      return undefined; }

    chan.usersSubscribed.push(await this._userIdModel.create(sub.idUser));
    this._logger.log(`EN  VRAI CEST LA remontada ${chan.usersSubscribed}`)
  }))
  .pipe(
    map((doc: MongooseDocument) => !!doc ? doc.toJSON() : this._logger.log(`EN  VRAI CEST Le DESASTTRE`)),
  );
}
}*/
