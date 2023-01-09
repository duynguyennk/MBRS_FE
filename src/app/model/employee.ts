export class Employee {
  employeeID?: number;
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  identifyNumber?: string;
  accountID?: number;
  userName?: string;
  departmentID?: number;
  email?: string;
  role?: string;
  Total?: number

  constructor(employeeID?: number, fullName?: string, phoneNumber?: string, dateOfBirth?: Date, identifyNumber?: string, accountID?: number, userName?: string, departmentID?: number, email?: string, role?: string, Total?: number) {
    this.employeeID = employeeID;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.identifyNumber = identifyNumber;
    this.accountID = accountID;
    this.userName = userName;
    this.departmentID = departmentID;
    this.email = email;
    this.role = role;
    this.Total=Total;
  }
}
