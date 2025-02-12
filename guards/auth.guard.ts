import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {} 

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization?.split(' ')[1]; // Gets the token from header

        if(!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const decoded = await this.jwtService.verifyAsync(token);
            request['user'] = decoded.sub; //Attach user to request
            return true;

        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}