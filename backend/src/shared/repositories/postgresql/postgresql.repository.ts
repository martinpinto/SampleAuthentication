import { logger } from '../../services/logger.service';
const { config } = require('../../../config/index');
const { Pool, Client } = require('pg')

export class PostgresqlRepository {
    connection;

    constructor() {
        logger.debug(config.database.postgresql);

        this.connection = new Pool({
            user: config.database.postgresql.user || process.env.DB_USER,
            host: config.database.postgresql.baseurl,
            database: config.database.postgresql.database,
            password: config.database.postgresql.password || process.env.DB_PWD,
        });
    }
    
    query(sql, args): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, res: any[]) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    convertDateToYMD(date) {
        var year, month, day;
        year = String(date.getFullYear());
        month = String(date.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(date.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
}
