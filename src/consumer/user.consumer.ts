import {
  Consumer,
  MSListenerType,
  RabbitMQListener,
  Inject,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { ILogger } from '@midwayjs/logger';

@Consumer(MSListenerType.RABBITMQ)
export class UserConsumer {
  @Inject()
  ctx: Context;

  @Inject()
  logger: ILogger;

  @RabbitMQListener('tasks')
  async gotData(msg: ConsumeMessage) {
    this.ctx.channel.ack(msg);
    this.logger.info(msg.content);
  }
}
