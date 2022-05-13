import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户名
   */
  @Column({ name: 'name' })
  name: string;

  /**
   * 密码
   */
  @Column({ name: 'password' })
  password: string;
}
