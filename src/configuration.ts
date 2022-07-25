import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as jwt from '@midwayjs/jwt';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/orm';

import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import * as redis from '@midwayjs/redis';
import * as rabbitmq from '@midwayjs/rabbitmq';

/*
 * 跨域我们这里可以从 @koa/cors 和 koa2-cors 中任选其一
 * 具体使用方法，我们可以点进去看源码，有使用说明，也有其具体的实现方法
 **/
const cors = require('@koa/cors');
// const cors = require('koa2-cors');

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    orm,
    redis,
    rabbitmq,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    this.app.use(
      cors({
        origin: function (ctx) {
          console.log(ctx.url, 'sssssss');
          //设置允许来自指定域名请求
          if (ctx.url === '/user/login') {
            return 'http://localhost:8080'; // 允许来自所有域名请求
          }
          return 'http://localhost:8081'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
      })
    );
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtPassportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
