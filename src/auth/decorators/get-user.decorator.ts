import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext )=> {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
        throw new InternalServerErrorException('Usuer not found (Request)');

    return (!data) ? user : user[data];
});
