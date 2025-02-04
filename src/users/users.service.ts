import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: ['developer'],
      });

      await this.userRepository.save(user);

      return user;

    } catch (error) {     
      this.handleDBError(error);
    }

  }

  async findByEmail(email: string) : Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isactive', 'roles']
    });
  }

  async findById(id: string) : Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'isactive', 'roles']
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  private handleDBError(error: any) {
  
    console.log(error);

    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('Usuario ya existe');
    }

    throw new InternalServerErrorException('Internal server error');
  }


}
