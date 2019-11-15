import { Controller, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('back')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}
  @Get(':id')
  getHello(@Param('id') params: string): string {
    return this.channelService.getHello() + params;
  }
}
