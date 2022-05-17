import { Inject, Controller, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ResultRtn } from '../constant/result';
import { ILogger } from '@midwayjs/logger';
import { StudentService } from '../service/student.service';

@Controller('/student')
export class APIController {
  @Inject()
  logger: ILogger;
  @Inject()
  ctx: Context;

  @Inject()
  student: StudentService;

  @Post('/save')
  async getStudent() {
    const res = await this.student.saveStudent();
    return ResultRtn.ofSuccess(res);
  }
}
