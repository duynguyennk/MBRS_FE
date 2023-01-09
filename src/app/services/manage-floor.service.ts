import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Floor } from '../model/floor';
import { filter } from '../model/filter';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageFloorService {
    private token = environment.tokenHeader + localStorage.getItem("TokenData");
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getListFloor(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_floor/GetListFloor", {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getDetailInformationFloor(floorID: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_floor/GetTheFloorInformation?floorID=" + floorID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getFloorWithFilter(filter: filter): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_floor/GetListFloorWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    createFloor(floor: Floor): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_floor/CreateFloor", floor, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    updateFloor(floor: Floor): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_floor/UpdateFloor", floor, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    deleteFloor(floorID: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/v1/api/manage_floor/DeleteAFloor?floorID=" + floorID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }
}
