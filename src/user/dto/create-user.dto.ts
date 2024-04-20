import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    password: string;

    @IsString()
    role: string;

    constructor(u: string, e: string, p: string, r: string = 'user') {
        this.username = u;
        this.email = e;
        this.password = p;
        this.role = r;
     }
}
