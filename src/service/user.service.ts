import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide('')
export class UserService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  // save
  async saveUser(name: string, pwd: string) {
    // create a entity object
    const user = new UserEntity();
    user.name = name;
    user.password = pwd;

    // save entity
    const userResult = await this.userModel.save(user);

    // save success
    this.logger.info(userResult.id);
  }

  // 查询数据
  async findUser() {
    // return await this.userModel.find();
    return await this.userModel.query('SELECT * from user');
  }

  // 删除数据
  async deleteUser(nameDel) {
    const user = await this.userModel.query(
      `SELECT * from user WHERE name='${nameDel}'`
    );
    await this.userModel.remove(user);
  }

  // 更新数据
  async updateUser(oldName, newName) {
    // const user = await this.userModel.query(
    //   `SELECT * from user WHERE name='${oldName}'`
    // );
    // user.name = newName;
    await this.userModel.query(
      `UPDATE user SET name = '${newName}' WHERE name = '${oldName}'`
    );
  }
}
