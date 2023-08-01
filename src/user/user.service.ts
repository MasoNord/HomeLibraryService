import { Injectable, BadRequestException} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {v4} from 'uuid'

@Injectable()
export class UserService {
  
  private users: User[] = [];
  
  public create(createUserDto: CreateUserDto): User {
    const user = {
      id: v4(),
      version: 1,
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    this.users.push(user);
    return user;
  }

  public findAll(): User[] {
    return this.users;
  }

  public findOne(id: string): User | null {
    const user = this.users.find(u => u.id === id);
    if (!user)
     return null;

    return user;
  } 

  public update(userIndex: number, updateUserDto: UpdateUserDto) {

    this.users[userIndex].password = updateUserDto.newPassword;
    this.users[userIndex].version = this.users[userIndex].version + 1;
    this.users[userIndex].updatedAt = Date.now();

    return this.users[userIndex];
  }

  public remove(userIndex: number, id: string) {

    this.users.splice(userIndex, 1);
    return {message: `User with ${id} was removed`};
  }
}
