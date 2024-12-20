import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { QueryLoginDto } from './dto/query-login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  mapFromStringToType,
  ResponseLoginDto,
} from './dto/response-login.dto';
import { QueryRegisterDto } from './dto/query-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: QueryLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: ResponseLoginDto,
  })
  async login(@Body() dto: QueryLoginDto): Promise<ResponseLoginDto> {
    return mapFromStringToType(
      await this.authService.login(dto.email, dto.password),
    );
  }

  @Post('register')
  @ApiBody({ type: QueryRegisterDto })
  async register(@Body() dto: QueryRegisterDto) {
    await this.authService.register(dto.username, dto.email, dto.password);
    return {
      message: 'User registered',
      status: 201,
    };
  }
}
