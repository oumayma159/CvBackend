import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @CurrentUser
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);