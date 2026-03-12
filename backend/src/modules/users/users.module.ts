import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { USER_REPOSITORY } from './interfaces/user-repository.interface';

@Module({
  controllers: [UsersController],
  providers: [
    UserRepository,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
