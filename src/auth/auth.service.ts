import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { json } from 'stream/consumers';


@Injectable()
export class AuthService {
    async login(loginDto: LoginDto) {
        
       const user = await this.prisma.user.findFirst({
        where: {email:loginDto.email}

        

       })
       if(!user) {
        throw new UnauthorizedException("User under this email cannot be found")
       }
       const isPasswordValid = await bcrypt.compare(loginDto.password,user.password)
       if(!isPasswordValid) {
        
        throw new UnauthorizedException("Password is Invalid");

        
       }
       if(!user.isVerified ) {
        throw new UnauthorizedException(" Email is not verified, Please Register again");
       }
       const accessToken = this.jwtService.sign({
        sub: user.id
        
       })
       return {accessToken}


       
    }
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    


    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique ({
            where:{
                email: dto.email
            }

        })
        if (existingUser && existingUser.isVerified) throw new UnauthorizedException("User already exists")

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.upsert({
            where: {email: dto.email},
            update: { firstName: dto.firstName,
                lastName: dto.lastName,
                username: dto.username,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                password: hashedPassword,},
            create:  {
                firstName: dto.firstName,
                lastName: dto.lastName,
                username: dto.username,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                password: hashedPassword,
            },
        });

        await this.generateOtp(user.id)

        return { message: 'User registered successfully', userId: user.id };
    } 

    async generateOtp(userId: string) {
        const otpCode = crypto.randomInt(100000, 999999).toString(); // This generates a 6 digit OTP
        const expiresAt = new Date(Date.now() +5 * 60 * 1000); //Expires in 5 minutes

        return await this.prisma.oTP.upsert({
            create: {
                
                userId,
                otp: otpCode,
                expiresAt,
            },
            update: {
                userId,
                otp: otpCode,
                expiresAt,
            },
            where: { userId}
        });
    }
    async verifyOtp(email: string, otpCode: string) {
        const otpRecord = await this.prisma.oTP.findFirst({
            where: { user: {
                email: email
            },otp: otpCode },
        });

        if (!otpRecord || new Date() > otpRecord.expiresAt) {
            throw new Error('Invalid or Expired OTP');
        }

        await this.prisma.oTP.delete({ where: { id: otpRecord.id}}); 
          // deletes otp after use
          await this.prisma.user.update({ where:
             { email: email},
             data:{isVerified: true}
            },
        ); 

        return {message: " User Registered Successfully "};
       
    }

    /// OTP For email verification

    async generateemailOtp(email: string) {
        const user = await this.prisma.user.findUnique({where: { email } });

        if(!user) throw new UnauthorizedException("User not Found");

        const otpCode = crypto.randomInt(100000, 999999).toString(); // 6 digit OTP
        const expiresAt = new Date(Date.now() +5 * 60 * 1000); // 5 minute expiry

        await this.prisma.oTP.create({
            data: { userId: user.id, otp: otpCode, expiresAt },
        });

        //Here, sending OTP via email through sendgrid
        console.log('OTP for ${email}: ${otpCode}');

        return { message: "OTP sent Successfully"};
    }
}
