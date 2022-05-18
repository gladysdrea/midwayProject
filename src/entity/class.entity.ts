import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 学生姓名
   */
  @Column({ name: 'class_name' })
  class_name: string;
}
