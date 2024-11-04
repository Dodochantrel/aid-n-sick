import { ApiProperty } from '@nestjs/swagger';

export class QueryRegisterDto {
  @ApiProperty({
    description: 'Usename of the user',
    example: 'Toto',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'test@test.test',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  password: string;
}
