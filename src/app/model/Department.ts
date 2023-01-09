export class Department {
    departmentID: number;
    departmentCode: string;
    departmentName: string;

    constructor(departmentID: number, departmentCode: string, departmentName: string) {
        this.departmentID = departmentID;
        this.departmentCode=departmentCode;
        this.departmentName=departmentName;
    }
}