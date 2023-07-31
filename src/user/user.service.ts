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
    if (!user) {
     return null;
    }
    return user;
  } 

  public update(index: number, updateUserDto: UpdateUserDto) {

    this.users[index].password = updateUserDto.newPassword;
    this.users[index].version = this.users[index].version + 1;
    this.users[index].updatedAt = Date.now();

    return this.users[index];
  }

  public remove(index: number, id: string) {

    this.users.splice(index, 1);
    return {message: `User with ${id} was removed`};
  }
}
