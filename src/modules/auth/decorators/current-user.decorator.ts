import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//TODO NOTE : Buradaki CurrentUser decorator ile bizler normalde request.user deyip erişmemiz gerken yapıya
//TODO NOTE : sadece @CurrentUser() dekoratörü ile erişebiyoruz.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
