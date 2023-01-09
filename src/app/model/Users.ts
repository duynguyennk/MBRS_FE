export class Users{
    UserName?: string;
    Password?: string;
    Email?: string;
    DepartmentCode?: string;
    DepartmentName?: string;
    Role?: string;
    Token?:string;
    constructor(UserName?: string,Password?: string,Email?: string,DepartmentCode?: string,DepartmentName?: string,Role?: string,Token?:string)
    {
        this.UserName=UserName;
        this.Password=Password;
        this.Email=Email;
        this.DepartmentCode = DepartmentCode;
        this.DepartmentName= DepartmentName;
        this.Role = Role;
        this.Token = Token;
    }
    
}