import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { StudentEntity } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { getConnection } from 'typeorm';
import { ClassEntity } from '../entity/class.entity';

@Provide('')
export class StudentService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(StudentEntity)
  studentModel: Repository<StudentEntity>;

  @InjectEntityModel(ClassEntity)
  clazzModel: Repository<ClassEntity>;

  // save
  async saveStudent(param) {
    // create a entity object
    const student = new StudentEntity();
    student.student_name = param.name;
    student.student_id = param.studentId;
    student.class = param.clazzName;

    const clazz = new ClassEntity();
    clazz.class_name = '三年级2班';

    // 获取连接并创建新的 QueryRunner
    const queryRunner = getConnection().createQueryRunner();

    // 使用我们的新 QueryRunner 建立真正的数据库连
    await queryRunner.connect();

    // 开始事务：
    await queryRunner.startTransaction();

    try {
      // 对此事务执行一些操作：
      // await this.studentModel
      //   .createQueryBuilder('student', queryRunner)
      //   .insert()
      //   .into(StudentEntity)
      //   .values(student)
      //   .execute();
      await queryRunner.manager.save(student);
      // if (true) {
      //   throw new Error();
      // }
      await queryRunner.manager.save(clazz);
      // await queryRunner.manager.save(student);

      // 提交事务：
      await queryRunner.commitTransaction();
    } catch (err) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
    }
  }
}
