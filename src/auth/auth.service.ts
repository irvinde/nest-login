import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
      @Inject(forwardRef(() => UsersService))
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
  async login(loginUserDto: LoginUserDto) {
    
    const {email, password} = loginUserDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // 🔹 Compara la contraseña usando bcrypt
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      ...user,
      token: this.getJwtToken({id: user.id}),
    };

  }

  async checkAuthStatus( user:User) {

    return {
      ...user,
      token: this.getJwtToken({id: user.id}),
    };

  }


  private getJwtToken( payload: JwtPayload) {
    
    const token = this.jwtService.sign(payload);
    return token;
  }

  
}
