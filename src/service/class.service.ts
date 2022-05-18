import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { ClassEntity } from '../entity/class.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide('')
export class ClassService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(ClassEntity)
  studentModel: Repository<ClassEntity>;

  // save
  async saveClass() {
    // create a entity object
    const cl = new ClassEntity();
    cl.class_name = '三年级2班';

    // save entity
    await this.studentModel.save(cl);
  }
}
