import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Verify } from 'crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';



@Controller('auth')
export class AuthController {
    constructor (private readonly service : AuthService) {}
    @Post('register')
    register(@Body() registerDto:RegisterDto) {
        return this.service.register(registerDto)


    }

    @Post('login')
    login(@Body() loginDto:LoginDto) {
        return this.service.login(loginDto)
    }

    @Post('verify-otp')
    verifyotp(@Body() verifyDto: VerifyOtpDto) {
        return this.service.verifyOtp(verifyDto.email,verifyDto.otp)
    }
    
}

// we are defining routes here