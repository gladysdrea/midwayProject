import { MidwayConfig } from '@midwayjs/core';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1651729769300_2098',
  koa: {
    port: 7001,
  },
  cors: {
    credentials: false,
    origin: '*',
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  orm: {
    /**
     * 单数据库实例
     */
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123',
    database: 'demo',
    synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: true,
  },
} as MidwayConfig;
