import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'entities';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request & { user: { email: string; user: User } } = ctx
      .switchToHttp()
      .getRequest();

    return data && request.user ? request.user[data] : request.user;
  },
);
