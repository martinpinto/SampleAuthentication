import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './user.controller';
import * as jwt from 'express-jwt';

const router = express.Router();

router.use(jwtService);

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);

export { router };