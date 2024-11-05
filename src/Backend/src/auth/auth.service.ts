import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { AppError } from 'src/error/app-error.exception';
import * as bcrypt from 'bcrypt';

export const SALTORROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.repository.findOne({ where: { username } });
    // Crypter le mot de passe et le comparer avec celui de la base de données
    await this.checkPassword(password, user.password);
    return this.generateToken(user);
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User(username, await this.hashPassword(password), email);
    return await this.repository.save(user);
  }

  private async checkPassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new AppError('Wrong password', 400);
    }
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, SALTORROUNDS);
  }

  generateToken(user: User) {
    const jwtPayload = {
      username: user.username,
      id: user.id,
      auth_time: new Date().getTime(),
      email: user.email,
    };
    return this.jwtService.sign(jwtPayload);
  }
}
