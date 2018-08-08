import * as express from 'express';
import { logger } from '../../shared/services/logger.service';

import User from './user.model';
import UserService from './user.service';

export const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User[]> {
    // check if user equals administrator
    let users = await UserService.getUsers();

    res.status(200).json(users);    
    return null;
  },
  async getOneAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User> {
    if (req.params && req.params.id) {
        let id: number = req.params.id;

        let user = await UserService.getUser(id);
        res.status(200).json(user);
        return user;
    }
    return null;  
  }
};
