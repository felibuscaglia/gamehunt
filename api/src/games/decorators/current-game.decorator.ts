import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { Game } from 'entities';

export const CurrentGame = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request & { game: Game } = ctx.switchToHttp().getRequest();

    return data && request.game ? request.game[data] : request.game;
  },
);
