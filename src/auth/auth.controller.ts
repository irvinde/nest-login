import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { use } from 'passport';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidaRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('testAuth')
  @UseGuards(AuthGuard())
  testAuth(
    @GetUser() user: any
  ) {
    return {
      ok: true,
      message: user
    };
  }

  @Get('testAuth2')
  @Auth()
  testAuth2(
    @GetUser() user: any
  ) {
    return {
      ok: true,
      message: user
    };
  }
 
}
