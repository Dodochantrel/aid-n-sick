import { ApiProperty } from '@nestjs/swagger';

export class QueryLoginDto {
  @ApiProperty({
    description: 'username of the user',
    example: 'test@test.test',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  password: string;
}
