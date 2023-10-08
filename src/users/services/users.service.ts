import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}
  private users: User[] = [
    {
      id: 1,
      name: 'Patrick',
      surnames: 'Jane',
      password: 'prime$985',
      email: 'patrick.jane@gmail.com',
      birthday: 769194492,
    },
    {
      id: 2,
      name: 'Teresa',
      surnames: 'Lisbon',
      password: 'redplum@s',
      email: 'teresalisbon@gmail.com',
      birthday: 693580092,
    },

    {
      id: 3,
      name: 'Jhon',
      surnames: 'Dubal Redinson',
      password: 'redjhon12',
      email: 'redjhon@gmail.com',
      birthday: 814882332,
    },
  ];

  findAll() {
    const apiKey2 = this.configService.get('API_KEY');
    const dbname = this.configService.get('DATA_BASE_NAME');
    console.log(apiKey2, dbname);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...payload,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const newUser = {
      id,
      ...payload,
    } as User;

    const newUsers = this.users.map((item: User) => {
      return item.id === id ? newUser : item;
    });

    this.users = newUsers;
    return newUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    return this.users.splice(index, 1);
  }
}
