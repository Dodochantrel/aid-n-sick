import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.auth';
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

  async login(email: string, password: string): Promise<string> {
    const user = await this.repository.findOne({ where: { email } });
    // Crypter le mot de passe et le comparer avec celui de la base de données
    await this.checkPassword(password, user.password);
    return this.generateToken(user);
  }

  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const user = new User(email, this.hashPassword(password), username);
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
