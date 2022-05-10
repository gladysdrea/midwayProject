import { Inject, Controller, Get, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { User } from '../interface';
import { ResultRtn } from '../constent/result';
import { ILogger } from '@midwayjs/logger';

// import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/user')
export class APIController {
  @Inject()
  jwt: JwtService;
  @Inject()
  logger: ILogger;
  @Inject()
  ctx: Context;

  @Post('/login')
  async getUser(@Body() user: User): Promise<ResultRtn<string>> {
    const token = await this.jwt.sign({
      username: user.name,
      password: user.password,
    });
    this.logger.info('token:[%s]', token);
    return ResultRtn.ofSuccess(token);
  }

  @Get('/test')
  async getTest(): Promise<ResultRtn<object>> {
    const list = [1, 2, 3, 4];
    return ResultRtn.ofSuccess(list);
  }
}
