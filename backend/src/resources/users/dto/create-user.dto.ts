import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name should be string',
    }),
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email should be valid',
      })
      .email(),
    mobile: z
      .string({
        required_error: 'mobile is required',
        invalid_type_error: 'mobile should be 10 digit',
      })
      .regex(/^[6798]/, 'mobile should start with either 6, 7, 8 or 9')
      .length(10, 'mobile should have exactly 10 digits'),
    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password should be valid',
      })
      .min(8)
      .max(256),
  })
  .required();

export class CreateUserDto {
  @ApiProperty({ example: 'Aakash' })
  name: string;

  @ApiProperty({ example: 'sky@aakashgajjar.dev' })
  email: string;

  @ApiProperty({ example: '9924728291' })
  mobile: string;

  @ApiProperty({ example: 'helloWorld' })
  password: string;
}
