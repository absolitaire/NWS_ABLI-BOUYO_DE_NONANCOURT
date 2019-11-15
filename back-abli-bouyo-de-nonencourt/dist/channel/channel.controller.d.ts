import { ChannelService } from './channel.service';
import { Observable } from 'rxjs';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';
import { HandlerParams } from './validators/handler-params';
export declare class ChannelController {
    private readonly _channelService;
    constructor(_channelService: ChannelService);
    getHello(params: string): string;
    findAll(): Observable<ChannelEntity[] | void>;
    findOne(params: HandlerParams): Observable<ChannelEntity>;
    create(createChannelDto: CreateChannelDto): Observable<ChannelEntity>;
}
