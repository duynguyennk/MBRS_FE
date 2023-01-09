export class Customer {
  customerID?: number;
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  identifyNumber?: string;
  accountID?: number;
  userName?: string;
  departmentID?: number;
  email?: string;
  role?: string;
  total?: number
  password?: string

  constructor(customerID?: number, fullName?: string, phoneNumber?: string, dateOfBirth?: Date, identifyNumber?: string, accountID?: number, userName?: string, departmentID?: number, email?: string, role?: string, total?: number,  password?: string) {
    this.customerID = customerID;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.identifyNumber = identifyNumber;
    this.accountID = accountID;
    this.userName = userName;
    this.departmentID = departmentID;
    this.email = email;
    this.role = role;
    this.total=total;
    this.password=password;
  }
}
