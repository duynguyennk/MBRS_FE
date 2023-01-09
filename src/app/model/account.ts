export class Account {
    id: number;
    name: string;
    username: string;
    email: string;

    constructor(id: number, name: string, username: string, email: string) {
        this.id = id;
        this.name=name;
        this.username=username;
        this.email=email;
    }
}