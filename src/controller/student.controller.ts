import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ResultRtn } from '../constant/result';
import { ILogger } from '@midwayjs/logger';
import { StudentService } from '../service/student.service';
import { StudentParam } from '../interface';

@Controller('/student')
export class APIController {
  @Inject()
  logger: ILogger;
  @Inject()
  ctx: Context;

  @Inject()
  student: StudentService;

  @Post('/save')
  async getStudent(@Body() param: StudentParam): Promise<ResultRtn<void>> {
    const res = await this.student.saveStudent(param);
    return ResultRtn.ofSuccess(res);
  }
}
