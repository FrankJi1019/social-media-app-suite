import { FieldMiddleware, MiddlewareContext } from '@nestjs/graphql';
import jwt_decode from 'jwt-decode';

export const TokenDecoderMiddleware: FieldMiddleware = (
  context: MiddlewareContext,
  next: (error?: any) => void,
) => {
  const authHeader = context.context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    context.context.req.user = jwt_decode(token);
  }
  return next(context);
};
