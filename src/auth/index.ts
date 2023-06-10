import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import {AuthenticatedRequest} from '../interface/auth.interface'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}