import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dtos/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: loginDto) {
        
       const user = await this.prisma.user.findFirst({
        where: {email:loginDto.email}

        

       })
       if(!user) {
        throw new UnauthorizedException("User under this email cannot be found")
       }
       const isPasswordValid = await bcrypt.compare(loginDto.password,user.password)
       if(!isPasswordValid) {
        
        throw new UnauthorizedException("Password is Invalid")

        
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
        if (existingUser) throw new UnauthorizedException("User already exists")
            
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                username: dto.username,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                password: hashedPassword,
            },
        });

        return { message: 'User registered successfully', userId: user.id };
    }
}
