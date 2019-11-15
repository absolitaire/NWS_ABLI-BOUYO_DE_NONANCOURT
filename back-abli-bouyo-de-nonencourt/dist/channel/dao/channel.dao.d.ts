import { Model } from 'mongoose';
import { Channel } from '../interfaces/channel.interface';
import { Observable } from 'rxjs';
import { CreateChannelDto } from '../dto/create-channel.dto';
export declare class ChannelDao {
    private readonly _channelModel;
    constructor(_channelModel: Model<Channel>);
    findAllChannels(): Observable<Channel[] | void>;
    findChannelById(id: string): Observable<Channel | void>;
    createChannel(channel: CreateChannelDto): Observable<Channel>;
    findChannelByIdAndRemove(id: string): Observable<Channel | void>;
}
