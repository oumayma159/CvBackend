import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async addUser(user: User) {
    return await this.userRepo.save(user);
  }

  async register(userData: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepo.findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.password = userData.password;
    user.salt = salt;
    user.role = userData.role;
    await this.userRepo.save(user);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findByUserName(username: string) {
    return await this.userRepo.findOneBy({ username: username });
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
