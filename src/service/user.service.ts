import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';
import { Params } from '../interface';
import { PageInfo } from '../constant/pageInfo';
import { RedisService } from '@midwayjs/redis';
import { RabbitmqService } from './rabbitmq';

@Provide('')
export class UserService {
  @Inject()
  logger: ILogger;

  @Inject()
  redisService: RedisService;

  @Inject()
  rabbitmqService: RabbitmqService;

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  // save
  async saveUser(name: string, pwd: string) {
    // create a entity object
    const user = new UserEntity();
    user.name = name;
    user.password = pwd;

    //  注册的用户名是唯一的，先查库有没有注册过，没有注册过就注册，注册过提示用户已注册
    const findUser = await this.userModel
      .createQueryBuilder('user')
      .select()
      .where('user.name = :name', { name: `${name}` })
      .getOne();
    if (findUser != null) {
      // 注册过
      return null;
    } else {
      // save entity
      const userResult = await this.userModel.save(user);
      // save success
      this.logger.info(userResult.id);
      await this.rabbitmqService.sendToQueue('task1', {
        hello: 'Welcome to register',
      });
      return userResult;
    }
  }

  async findUserByName(name: string, pwd: string) {
    const result = await this.redisService.get(name);
    if (!result) {
      // Redis 中不存在，先去查 MySQL 库，如果 MySQL 中有，就存到 Redis 中，如果 MySQL 中没有就说明没有该用户
      const user = await this.userModel
        .createQueryBuilder('user')
        .select()
        .where('user.name = :name', { name: `${name}` })
        .getOne();
      this.logger.info(user, 'user');
      if (user != null) {
        await this.redisService.set(name, JSON.stringify(user));
        return user;
      } else {
        return null;
      }
    } else {
      const res = await this.redisService.get(name);
      return JSON.parse(res);
    }
  }

  // 查询数据
  async findUserList(page: number, size: number, params: Params) {
    // return await this.userModel.find();
    // return await this.userModel.query('SELECT * from user');
    const db = this.userModel.createQueryBuilder('user');
    // eslint-disable-next-line eqeqeq
    if (params.name != null && params.name != '') {
      // db.andWhere('user.name = :name', { name: `${params.name}` });
      db.andWhere('user.name Like :param').setParameters({
        param: '%' + params.name + '%',
      });
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
    await this.redisService.del(nameDel);
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
