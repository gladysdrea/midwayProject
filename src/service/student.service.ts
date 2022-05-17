import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { StudentEntity } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide('')
export class StudentService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(StudentEntity)
  studentModel: Repository<StudentEntity>;

  // save
  async saveStudent() {
    // create a entity object
    const student = new StudentEntity();
    student.student_name = 'wyy';
    student.student_id = 12;
    student.class = '三年级2班';

    // save entity
    await this.studentModel.save(student);
  }
}
