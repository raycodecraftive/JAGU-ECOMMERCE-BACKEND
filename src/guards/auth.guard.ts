import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express"

@Injectable()
export class JaguAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {} 

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization?.split(' ')[1]; // Gets the token from header

        if(!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const decoded = await this.jwtService.verify(token);
            request['user'] = decoded.sub; //Attach user to request

            console.log(request['user']);
            // sub means userID which we included on the auth login 
            return true;

        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}