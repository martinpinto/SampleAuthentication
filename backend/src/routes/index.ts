import { router as userRouter } from "./user/router";

const express = require('express');
const Router = express.Router;
const router = Router();

router.use('/user', userRouter);

export { router };