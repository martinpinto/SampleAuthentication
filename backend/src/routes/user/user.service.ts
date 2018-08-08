import { PostgresqlRepository } from '../../shared/repositories/postgresql/postgresql.repository'
import User from './user.model';
import UserEntity from '../../shared/repositories/entities/user.entity';
import { logger } from '../../shared/services/logger.service';

const bcrypt = require('bcrypt');

class UsersService {
    private postgresql: PostgresqlRepository;
    private SALT = 10;

    constructor() {
        this.postgresql = new PostgresqlRepository();
    }

    async getUsers() {
        // check if current logged in user id = user id
        const query: string = `SELECT * FROM RegisteredUser`;
        logger.debug(query);

        let rowdata: any = await this.postgresql.query(query, null);
        let users: User[] = [];
        for (let user of rowdata.rows) {
            users.push(new User(new UserEntity(user)));
        }
        return users;
    }

    async getUser(id: number) {
        // check if current logged in user id = user id
        const query: string = `SELECT * FROM RegisteredUser WHERE ru_id = $1`;
        const values = [id];
        logger.debug(query);

        let rowdata = await this.postgresql.query(query, values);
        let user: User = new User(new UserEntity(rowdata[0]));
        return user;
    }

    async login(email: string, password: string) {
        let salt = await bcrypt.genSalt(this.SALT);        
        let hashPassword = await bcrypt.hash(password, salt);
        
        const query: string = `SELECT * FROM RegisteredUser WHERE ru_email = $1`;
        const values: string[] = [email];
        logger.debug(query);

        let rowdata: any = await this.postgresql.query(query, values);
        // const match = await bcrypt.compare(password, user.passwordHash);
        logger.debug(rowdata.rows);
        
        let user: User = new User(new UserEntity(rowdata.rows[0]));
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
        }
        return null;
    }

    async register(user: User) {
        let password = user.password;
        let salt = await bcrypt.genSalt(this.SALT);
        let hashPassword = await bcrypt.hash(password, salt);

        // Store the user to the database, then send the response
        const query: string = `INSERT INTO RegisteredUser (
            ru_firstname, ru_lastname, ru_password, ru_email
        ) VALUES (
            $1, $2, $3, $4
        )`;
        const values: string[] = [user.firstname, user.lastname, hashPassword, user.email];
        logger.debug(query);

        try {
            let rowdata: any = await this.postgresql.query(query, values);
            return rowdata.insertId;
        } catch (err) {
            throw err;
        }
    }

}

export default new UsersService();