import { Inject, Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class UserService {
  @Inject()
  logger: ILogger;

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  // save
  async saveUser() {
    // create a entity object
    const user = new UserEntity();
    user.name = 'Gladysdrea';
    user.password = '12345';

    // save entity
    const userResult = await this.userModel.save(user);

    // save success
    this.logger.info(userResult.id);
  }
}
