import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository) {}

  findAll() {
    return this.userRepo.findAll();
  }

  async findById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    return this.userRepo.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.userRepo.delete(id);
  }
}
