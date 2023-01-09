export class ActivityEmployee {
    activityEmployeeID: number
    contentActivity: string
    employeeID: number
    fullName: string

    constructor(activityEmployeeID: number, contentActivity: string, employeeID: number, fullName: string) {
        this.activityEmployeeID = activityEmployeeID;
        this.contentActivity = contentActivity;
        this.employeeID = employeeID;
        this.fullName = fullName;
    }
}