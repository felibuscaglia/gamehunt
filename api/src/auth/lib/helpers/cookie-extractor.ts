import { Request } from 'express';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../constants';

export const cookieExtractor = (
  req: Request,
  isRefreshTokenStrategy = false,
) => {
  return (
    req?.cookies[
      isRefreshTokenStrategy
        ? REFRESH_TOKEN_COOKIE_NAME
        : ACCESS_TOKEN_COOKIE_NAME
    ] ?? null
  );
};
