import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Channel } from '../interfaces/channel.interface';
import { Observable } from 'rxjs';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { SubscriptionDto } from '../dto/subscription.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message } from '../interfaces/message.interface';
import { MessageEntity } from '../entities/message.entity';
import { FindMessagesDto } from '../dto/find-messages.dto';
export declare class ChannelDao {
    private readonly _channelModel;
    private readonly _messageModel;
    private readonly _logger;
    constructor(_channelModel: Model<Channel>, _messageModel: Model<Message>, _logger: Logger);
    findAllChannels(): Observable<Channel[] | void>;
    findChannelById(id: string): Observable<Channel | void>;
    findMessagesOnChannel(params: FindMessagesDto): Observable<Message[] | void>;
    createChannel(channel: CreateChannelDto): Observable<Channel>;
    findChannelByIdAndRemove(id: string): Observable<Channel | void>;
    subscribe(sub: SubscriptionDto): Observable<Channel | void>;
    unsubscribe(sub: SubscriptionDto): Observable<Channel | void>;
    existsWithId(id: string): Observable<boolean>;
    private _addDateToMessage;
    writeIntoChannel(message: CreateMessageDto): Observable<MessageEntity>;
}
