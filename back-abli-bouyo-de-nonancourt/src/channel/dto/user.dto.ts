import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class UserDto {
  @ApiModelProperty({description:'id of a subscribed user', example: '5763cd4dc378a38ecd387737'})
  @IsOptional()
  @IsMongoId()
  _id: string
/*
  constructor(id: string){
    this._id = id;
  }*/
}
