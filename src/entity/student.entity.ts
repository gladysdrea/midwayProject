import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 学生姓名
   */
  @Column({ name: 'student_name' })
  student_name: string;

  /**
   * 学生ID
   */
  @Column({ name: 'student_id' })
  student_id: number;

  /**
   * 所在班级
   */
  @Column({ name: 'class' })
  class: string;
}
