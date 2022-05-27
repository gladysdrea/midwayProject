// src/middleware/jwt.middleware.ts

import { Middleware } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import * as passport from 'passport';
import { Context } from '@midwayjs/koa';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  ignore(ctx: Context): boolean {
    return ctx.path === '/user/login' || ctx.path === '/user/register';
  }

  getAuthenticateOptions():
    | Promise<passport.AuthenticateOptions>
    | passport.AuthenticateOptions {
    return {};
  }
}
