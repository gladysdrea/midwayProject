import { Inject, Controller, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ResultRtn } from '../constant/result';
import { ILogger } from '@midwayjs/logger';
import { ClassService } from '../service/class.service';

@Controller('/class')
export class APIController {
  @Inject()
  logger: ILogger;
  @Inject()
  ctx: Context;

  @Inject()
  clazz: ClassService;

  @Post('/save')
  async getStudent(): Promise<ResultRtn<void>> {
    const res = await this.clazz.saveClass();
    return ResultRtn.ofSuccess(res);
  }
}
