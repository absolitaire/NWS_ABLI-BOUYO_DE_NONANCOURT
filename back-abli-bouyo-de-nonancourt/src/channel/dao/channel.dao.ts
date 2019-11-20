import { ConflictException, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Channel } from '../interfaces/channel.interface';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { UserDto } from '../dto/user.dto';
import { SubscriptionDto } from '../dto/subscription.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message } from '../interfaces/message.interface';
import { MessageEntity } from '../entities/message.entity';
import { FindMessagesDto } from '../dto/find-messages.dto';
import { RichMessageEntity } from '../entities/richmessage.entity';

@Injectable()
export class ChannelDao {
  /**
   * Class constructor
   *
   * @param {Model<Channel>} _channelModel instance of the model representing a Channel
   */
  constructor(@InjectModel('Channel') private readonly _channelModel: Model<Channel>,
              @InjectModel('Message') private readonly _messageModel: Model<Message>,
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
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person in the db
   *
   * @return {Observable<Channel | void>}
   */
  findChannelByIdChannel(id: string): Observable<Channel | void> {
    return from(this._channelModel.findOne({idChannel : id}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
  //
  // findMessagesOnChannel(params: FindMessagesDto): Observable<Message[] | void> {
  //   return from(this._messageModel.find({idChannel: params.idChannel}))
  //     .pipe(
  //       map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
  //     );
  // }


  findSubscribedChannelsOfUser(id: string): Observable<Channel[] | void> {
    return from(this._channelModel.find({usersSubscribed: {$in: id}}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  async findMessagesOnChannel(query: FindMessagesDto): Promise<MessageEntity[] | void> {
    let i = 0;
    let nb = 0;
    let res = [];
    let tmp: MessageEntity;
    for await (const message of await this._messageModel.find({ idChannel: query.idChannel })){
      this._logger.log(` ${i}`);
      if(query.threshold == -1 ||(nb < query.threshold && i+1 >= query.startingAt)){
        //res = res.concat(message);
        tmp = new MessageEntity(message);
        tmp.fillData(message.get('_id'),message.get('content'),message.get('idUser'),message.get('date'))
        res = res.concat(tmp);
        //this._logger.log(`AYYYYY2222 ${i} ${message}`);
        this._logger.log(`AYYYYY2222 ${i} ${tmp}`);
        nb++;
      }
      i++;
      this._logger.log(`lool ${res} , ${i}, ${nb}`);
    }
    this._logger.log(`AYYYYY2222 ${res} , ${i}, ${nb}`);
    return res;
  }


  async findPopulatedMessagesOnChannel(query: FindMessagesDto): Promise<RichMessageEntity[] | void> {
    let i = 0;
    let nb = 0;
    let res = [];
    let tmp: RichMessageEntity;
    for await (const message of await this._messageModel.find({ idChannel: query.idChannel })){
      this._logger.log(` ${i}`);
      if(query.threshold == -1 ||(nb < query.threshold && i+1 >= query.startingAt)){
        //res = res.concat(message);
        tmp = new RichMessageEntity(message);
        const pop = await message.populate('idUser').execPopulate();
        tmp.fillData(pop.get('content'),pop.get('date'),pop.get('idUser.login'),pop.get('idUser.picture'))
        res = res.concat(tmp);
        //this._logger.log(`AYYYYY2222 ${i} ${message}`);
        this._logger.log(`AYYYYY2222 ${i} ${tmp} ${pop}`);
        nb++;
      }
      i++;
      this._logger.log(`lool ${res} , ${i}, ${nb}`);
    }
    this._logger.log(`AYYYYY2222 ${res} , ${i}, ${nb}`);
    return res;
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
    //this._logger.log(`AYYYYY2222 ${sub.idChannel}`);
    return from(this._channelModel.findOneAndUpdate(
      { _id: sub.idChannel, usersSubscribed:{$nin: sub.idUser } },
      {$push: {usersSubscribed: sub.idUser}} ))

    .pipe(
      map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
    );
  }

  /**
   * Delete a channel. Called only when a channel is empty
   *
   * @param {string} id
   *
   * @return {Observable<Channel | void>}
   */
  unsubscribe(sub: SubscriptionDto): Observable<Channel | void> {
    return from(this._channelModel.findOneAndUpdate({ _id: sub.idChannel, usersSubscribed:{$in: sub.idUser } }, {$pull: {usersSubscribed: sub.idUser}} ))

      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
  /**
   * Delete a channel if it hasn't any subscribed users.
   *
   * @param {string} id
   *
   * @return {Observable<Channel | void>}
   */
  tryToDeleteChannel(id: string): Observable<Channel | void> {
    return from(this._channelModel.findOneAndDelete({ _id: id, usersSubscribed:{$size: 0 } } ))

      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
      );
  }
  /**
   * Delete a channel. Called only when a channel is empty
   *
   * @param {string} id
   *
   * @return {Observable<Channel | void>}
   */
  existsWithId(id: string): Observable<boolean> {
    return from(this._channelModel.exists({_id: id}));
  }

  /**
   * Create a new Channel
   *
   * @param {Channel} person to create
   *
   * @return {Observable<CreateChannelDto>}
   */
  // createMessage(message: CreateMessageDto): Observable<Message> {
  //   return from(this._messageModel.create(message))
  //     .pipe(
  //       map((doc: MongooseDocument) => doc.toJSON()),
  //     );
  // }

  private _addDateToMessage(message: CreateMessageDto): Observable<CreateMessageDto> {
    return of(message)
      .pipe(
        map(_ =>
          Object.assign(_, {
            date: Date.now(),
          }),
        ),
      );
  }
  writeIntoChannel(message: CreateMessageDto): Observable<MessageEntity> {
    return this._addDateToMessage(message)
      .pipe(
        flatMap(_ => this._messageModel.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`Message can't be created.`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new MessageEntity(_)),
      );
  }

/*  writeIntoChannel(message: CreateMessageDto): Observable<Message | void> {
    return from(this._messageModel.create(this._addDateToMessage(message)))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }*/
  // writeIntoChannel(message: CreateMessageDto, idMessage: string): Observable<Channel | void> {
  //   const idChannel = message.idChannel;
  //   delete message.idChannel;
  //   const messageModel = this._channelModel.create(message);
  //   return from(this._channelModel.findOneAndUpdate({ _id: idChannel, usersSubscribed:{$in: message.authorId} }, {$push: {messages: idMessage}} ))
  //
  //     .pipe(
  //       map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
  //     );
  // }
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
