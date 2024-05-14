export class User {
    username: string;
    password: string;
    type: string;

    constructor(username: string, password: string, type: string) {
        this.username = username;
        this.password = password;
        this.type = type;
    }
}