import {
  Provide,
  Scope,
  ScopeEnum,
  Init,
  Autoload,
  Destroy,
} from '@midwayjs/decorator';
import * as amqp from 'amqp-connection-manager';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton) // Singleton 单例，全局唯一（进程级别）
export class RabbitmqService {
  private connection: amqp.AmqpConnectionManager;

  private channelWrapper;

  @Init()
  async connect() {
    const config = Object.assign({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'admin',
      password: 'admin',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    });
    // 创建连接，你可以把配置放在 Config 中，然后注入进来
    this.connection = await amqp.connect(config);

    // 创建 channel
    this.channelWrapper = this.connection.createChannel({
      json: true,
      setup: function (channel) {
        return Promise.all([
          // 绑定队列
          channel.assertQueue('tasks', { durable: true }),
        ]);
      },
    });
  }

  // 发送消息
  public async sendToQueue(queueName: string, data: any) {
    return this.channelWrapper.sendToQueue(queueName, data);
  }

  @Destroy()
  async close() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
