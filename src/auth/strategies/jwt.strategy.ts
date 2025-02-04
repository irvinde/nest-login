import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private readonly usersService: UsersService,
        ConfigService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const user = await this.usersService.findById(payload.id);

        if (!user)
            throw new UnauthorizedException('Token inválido');

        if (!user.isactive)
            throw new UnauthorizedException('Usuário inativo');

        return user;
    }

}