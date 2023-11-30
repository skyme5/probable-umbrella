import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Email id already exists');
    }

    const newUser = this.userRepository.create({
      email: createUserDto.email,
      mobile: createUserDto.mobile,
      name: createUserDto.name,
      password: hashPassword,
    });

    await this.userRepository.save(newUser);
    newUser.password = undefined;

    return newUser;
  }

  async findAll(
    searchText: string = '',
    cursor: number = 0,
    limit: number = 0,
    sortKey,
    sortDir,
  ) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .orderBy(`user.${sortKey}`, sortDir === 'ASC' ? 'ASC' : 'DESC')
      .where(
        '(lower(user.email) like :searchText OR LOWER(user.name) like :searchText)',
        {
          searchText: `%${searchText}%`,
        },
      );

    const users = await qb
      .skip(Math.max(cursor - 1, 0) * limit)
      .take(limit)
      .getMany();
    const total = await qb.getCount();

    return {
      data: [...users],
      count: total,
      hasPrev: cursor > 1,
      hasNext: users.length == limit,
      pages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);

    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    await this.userRepository.delete(id);

    return user;
  }
}
