#!/usr/bin/env node
import * as express from 'express';
import * as debug from 'debug';
import { createServer } from 'http';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as passport from 'passport';
import * as Strategy from 'passport-local';
import * as expressJwt from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import * as helmet from 'helmet';
import * as moment from 'moment';

import { router as apiRouter } from './routes';
import UsersService from './routes/user/user.service';
import User from './routes/user/user.model';

const { config } = require('./config/index');
const { logger } = require('./shared/services/logger.service');
const { fs } = require('fs');

debug("ts-express:server");

const app: express.Application = express();
const port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.api.port || '3000');
const ip = process.env.OPENSHIFT_NODEJS_IP || config.api.host || "127.0.0.1";
const options = {
    // key: fs.readFileSync('./localhost.key'),
    // cert: fs.readFileSync('./localhost.cert')    
}

app.set('port', port);
app.set('domain', ip);

// const server = createServer(options, app); // https
const server = createServer(app);

middleware();
routes();
authentication();

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

///////////////////////////////////////////////////////////////////////////////////

function middleware(): void {
    app.set('startTime', new Date());

    app.use(compression()); // compress all requests

    app.use(bodyParser.json()); // parse application/json
    // parse application/vnd.api+json as json
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(morgan('combined', { stream: logger.stream })); // log every request to the console

    app.set('logger', logger);

    // proper development error handling
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            stacktrace: err.stack
        });
    });

    // activate CORS for server
    app.use(cors());
    
    app.use(helmet());
    
    // error handlers
    app.set('env', config.app.environment);

    logger.debug('Web server listening at: %s', config.api.host + ':' + config.api.port);
}

function routes(): void {
    // activate database and its routes
    // set the API routes in express
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'localhost');
        res.json({
            "started": app.get('startTime')
        });
    });
    app.use('/', router);
    app.use('/api', apiRouter);
}

function authentication(): void {
    const SECRET = config.oauth.secret || process.env.JWT_SECRET;
    const TOKENTIME = 120 * 60 * 60; // in seconds

    passport.use(new Strategy(
        {usernameField: "email", passwordField: "password"},
        async (username, password, done) => {
            // find user from db and compare the hash
            let user = await UsersService.login(username, password);
            logger.debug(user)
            if (user && user.id != -1) {
                delete user.password; // don't need the hashed password anymore
                done(null, user);
            } else {
                done(null, false); // user not found
            }
        }
    ));

    async function register(req, res, next) {
        try {
            let userId = await UsersService.register(req.body.user);
            
            // we store information needed in token in req.user again
            req.body.user.id = userId;
            delete req.body.user.password; // don't need the hashed password anymore
            next();
        } catch (err) {
            return next(err);
        }
    }

    function generateToken(req, res, next) {
        let expires = moment().utc().add(TOKENTIME, 'seconds').unix();
        req.token = jwt.sign({
            id: req.body.user ? req.body.user.id : req.user.id,
        }, SECRET, {
            expiresIn: expires
        });
        req.expiresIn = moment.unix(expires).format();
        next();
    }

    function respond(req, res) {
        res.status(200).json({
            user: req.body.user ? req.body.user : req.user,
            token: req.token,
            expiresIn: req.expiresIn
        });
    }

    const authenticate = expressJwt({
        secret: SECRET
    });

    app.use(passport.initialize());
    app.post('/oauth/login', passport.authenticate(
        'local', {
            session: false
        }), 
        generateToken, respond);

    app.post('/oauth/register', register, generateToken, respond);

    app.get('/oauth/me', authenticate, (req: any, res) => {
        res.status(200).json(req.user);
    });

}

///////////////////////////////////////////////////////////////////////////////////

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): number | boolean {
    var port: number = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    let addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`
    debug(`Listening on ${bind}`);
}

