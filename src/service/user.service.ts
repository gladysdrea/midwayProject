import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { Params } from '../interface';
import { PageInfo } from '../constant/pageInfo';
// import { PageInfo } from '../constant/pageInfo';

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
  async findUser(page: number, size: number, params: Params) {
    // return await this.userModel.find();
    // return await this.userModel.query('SELECT * from user');
    const db = this.userModel.createQueryBuilder('user');
    // eslint-disable-next-line eqeqeq
    if (params.name != null && params.name != '') {
      db.andWhere('user.name = :name', { name: `${params.name}` });
    }
    const res = await db
      .select()
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
    return PageInfo.pageLis(size, page, res);
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
