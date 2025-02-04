import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const RowHeader = createParamDecorator((data: string, ctx: ExecutionContext )=> {
    const request = ctx.switchToHttp().getRequest();
    const rowHeader = request.rawHeades;
    console.log('rowHeader:', rowHeader);

    if (!rowHeader)
        throw new InternalServerErrorException('Usuer not found (Request)');

    return (rowHeader);
});