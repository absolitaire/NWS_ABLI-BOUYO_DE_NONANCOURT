import { Observable } from 'rxjs';
import { ChannelEntity } from './entities/channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelDao } from './dao/channel.dao';
export declare class ChannelService {
    private readonly _channelDao;
    constructor(_channelDao: ChannelDao);
    getHello(): string;
    findAll(): Observable<ChannelEntity[] | void>;
    findOne(id: string): Observable<ChannelEntity>;
    create(channel: CreateChannelDto): Observable<ChannelEntity>;
    private _addChannel;
    delete(id: string): Observable<void>;
}
