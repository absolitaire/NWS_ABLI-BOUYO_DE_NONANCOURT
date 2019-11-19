import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse, ApiUseTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiUseTags('back/user')
@Controller('user')
export class UserController {
  /**
   * Class constructor
   * @param _userService
   */
  constructor(private readonly _userService: UserService) {
  }

  /**
   * Handler to answer to GET /user route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of user', type: UserEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No user exists in database' })
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._userService.findAll();
  }

  /**
   * Handler to answer to GET /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({ description: 'Returns the user for the given "id"', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._userService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /user route
   *
   * @param createUserDto data to create
   *
   * @returns Observable<UserEntity>
   */
  @ApiCreatedResponse({ description: 'The user has been successfully created', type: UserEntity })
  @ApiConflictResponse({ description: 'The user already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitBody({ name: 'CreateUserDto', description: 'Payload to create a new user', type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._userService.create(createUserDto);
  }
  /**
   * Handler to answer to DELETE /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({ description: 'The user has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._userService.delete(params.id);
  }

  /**
   * Handler to answer to PUT /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   * @param updateUserDto data to update
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({ description: 'The user has been successfully updated', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the user in the database', type: String })
  @ApiImplicitBody({ name: 'UpdateUserDto', description: 'Payload to update a user', type: UpdateUserDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateUserDto: UpdateUserDto): Observable<UserEntity> {
    return this._userService.tryToUpdate(params.id, updateUserDto);
  }
}
