import {
  Inject,
  Controller,
  Get,
  Body,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { User, UpdateUser, Params } from '../interface';
import { ResultRtn } from '../constant/result';
import { ILogger } from '@midwayjs/logger';
import { UserService } from '../service/user.service';

// import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/user')
export class APIController {
  @Inject()
  jwt: JwtService;
  @Inject()
  logger: ILogger;
  @Inject()
  ctx: Context;

  @Inject()
  user: UserService;

  @Post('/login')
  async getUser(@Body() user: User): Promise<ResultRtn<string>> {
    const token = await this.jwt.sign({
      username: user.name,
      password: user.password,
    });
    this.logger.info('token:[%s]', token);
    await this.user.saveUser(user.name, user.password);
    return ResultRtn.ofSuccess(token);
  }

  @Post('/list')
  async userList(@Body() param: Params) {
    const result = await this.user.findUser(1, 5, param);
    return ResultRtn.ofSuccess(result);
  }

  @Get('/del')
  async userDel(@Query('name') name: string) {
    const result = await this.user.deleteUser(name);
    return ResultRtn.ofSuccess(result);
  }

  @Post('/update')
  async userUpdate(@Body() updateUser: UpdateUser) {
    this.logger.info(updateUser);
    const result = await this.user.updateUser(
      updateUser.oldName,
      updateUser.newName
    );
    return ResultRtn.ofSuccess(result);
  }

  @Get('/test')
  async getTest(): Promise<ResultRtn<object>> {
    const list = [1, 2, 3, 4];
    return ResultRtn.ofSuccess(list);
  }
}
