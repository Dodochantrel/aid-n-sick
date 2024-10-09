import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({
    description: 'The token to access the API',
    example: 'efpojzpofj^ùeoifhuzemfhzeifioez',
    required: true,
  })
  access_token: string;
}

export const mapFromStringToType = (token: string): ResponseLoginDto => {
  return {
    access_token: token,
  };
};
