export default class UserEntity {

    public ru_id: number;
    public ru_firstname: string;
    public ru_lastname: string;
    public ru_password: string;
    public ru_email: string;

    constructor(entity?: any) {
        if (entity) {
            this.ru_id = entity.ru_id || -1;
            this.ru_firstname = entity.ru_firstname || "";
            this.ru_lastname = entity.ru_lastname || "";
            this.ru_password = entity.ru_password || "";
            this.ru_email = entity.ru_email || "";
        }
    }
}