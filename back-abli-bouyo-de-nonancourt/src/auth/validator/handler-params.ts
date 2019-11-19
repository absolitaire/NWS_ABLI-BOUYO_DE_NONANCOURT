import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
