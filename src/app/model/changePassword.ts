export class changePassword {
    userName: string;
    oldPassword: string;
    newPassword: string;

    constructor(userName: string, oldPassword: string, newPassword: string) {
        this.userName = userName;
        this.oldPassword=oldPassword;
        this.newPassword=newPassword;
    }
}