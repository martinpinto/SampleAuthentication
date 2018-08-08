import UserEntity from '../../shared/repositories/entities/user.entity';

export default class User {
    public id: number;

    public firstname: string;
    public lastname: string;
    public password: string;
    public email: string;

    constructor(user?: UserEntity) {
        if (user instanceof UserEntity) {
            this.id = user.ru_id || - 1;
            this.firstname = user.ru_firstname || "";
            this.lastname = user.ru_lastname || "";
            this.password = user.ru_password || "";
            this.email = user.ru_email || "";
        }
    }
}