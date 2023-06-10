import { User } from "../entities/index";
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: User;
  }