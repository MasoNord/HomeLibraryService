import { Injectable, NotFoundException, BadRequestException, ForbiddenException} from '@nestjs/common';
import { NoContent } from 'src/errors/nocontent.error';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validId } from 'src/util/validate.id';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class UserService {
  
  private users: CreateUserDto[] = [];
  
  create(login: string, password: string): CreateUserDto {
    const newUser = new CreateUserDto(login, password, uuidv4(),  1, new Date().getTime(), new Date().getTime());
    const copy = {...newUser};
    
    this.users.push(newUser);
    delete copy.password;

    return copy;
  }

  findAll() {
    if (this.users.length === 0)
      throw new NoContent();
    
    let copyUser = this.users.map(e => Object.assign({}, e));
    copyUser.forEach(u => delete u.password);
    
    return copyUser;
  }

  findOne(id: string): CreateUserDto {
    if(!validId(id)) {
      throw new BadRequestException("invalid uuid");
    }
    
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      throw new NotFoundException("Could not find user");
    }
    
    const copy = {...user};

    delete copy.password;

    return copy;
  } 

  update(id: string, updateUserDto: UpdateUserDto) {
    if(!validId(id)) {
      throw new BadRequestException("invalid uuid");
    }

    const userIndex = this.users.findIndex(u => u.id === id);
    console.log(this.users[userIndex].password);

    if (!this.users[userIndex]) {
      throw new NotFoundException("Could not find user");
    }

    if(updateUserDto.oldPassword !== this.users[userIndex].password)
      throw new ForbiddenException();
    
    this.users[userIndex].password = updateUserDto.newPassword; 

    let copyUser = {...this.users[userIndex]};

    delete copyUser.password;
    
    return copyUser;
  }

  remove(id: string) {
    if(!validId(id)) {
      throw new BadRequestException("invalid uuid");
    }

    const userIndex = this.users.findIndex(u => u.id === id);

    if (!this.users[userIndex]) {
      throw new NotFoundException("Could not find user");
    }

    this.users.splice(userIndex, 1);

    return {message: `User with ${id} was removed`};
  }
}
