import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Channel, UserId } from '../interfaces/channel.interface';
import { Observable } from 'rxjs';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { SubscriptionDto } from '../dto/subscription.dto';
export declare class ChannelDao {
    private readonly _channelModel;
    private readonly _userIdModel;
    private readonly _logger;
    constructor(_channelModel: Model<Channel>, _userIdModel: Model<UserId>, _logger: Logger);
    findAllChannels(): Observable<Channel[] | void>;
    findChannelById(id: string): Observable<Channel | void>;
    createChannel(channel: CreateChannelDto): Observable<Channel>;
    findChannelByIdAndRemove(id: string): Observable<Channel | void>;
    subscribe(sub: SubscriptionDto): Observable<Channel | void>;
    unsubscribe(sub: SubscriptionDto): Observable<Channel | void>;
    existsWithId(id: string): Observable<boolean>;
}
