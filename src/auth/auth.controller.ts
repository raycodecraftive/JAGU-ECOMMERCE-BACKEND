import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/register.dto';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dtos/login.dto';


@Controller('auth')
export class AuthController {
    constructor (private readonly service : AuthService) {}
    @Post('register')
    register(@Body() registerDto:RegisterDto) {
        return this.service.register(registerDto)


    }

    @Post('login')
    login(@Body() loginDto:loginDto) {
        return this.service.login(loginDto)
    }
    
}

// we are defining routes here