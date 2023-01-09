import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeeAccountService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListEmployeeAccount", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getEmployeesWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListEmployeeAccountWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getEmployeeInformationService(employeeID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetAEmployeeAccountToUpdateByID?employeeID=" + employeeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  deleteEmployee(employeeID: number, accountID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_account/DeleteEmployeeAccount?employeeID=" + employeeID + "&accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  createEmployee(EmployeeViewModel: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_account/CreateEmployeeAccount", EmployeeViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  updateEmployee(EmployeeViewModel: Employee): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/v1/api/manage_account/UpdateEmployeeAccount?employeeID=" + EmployeeViewModel.employeeID + "&accountID=" + EmployeeViewModel.accountID, EmployeeViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getListDepartmentService(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListDeparment", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
