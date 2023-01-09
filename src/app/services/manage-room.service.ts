import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { RoomInformation } from '../model/roomInformation';

@Injectable({
    providedIn: 'root'
})
export class ManageRoomService {
    private token = environment.tokenHeader + localStorage.getItem("TokenData");
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getRooms(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetListRoom", {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getDetailInformationRooms(typeRoomID: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetDetailInformationRoom?typeRoomID=" + typeRoomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getTheRoomInformation(roomID: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetTheRoomInformation?roomID=" + roomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getRoomsWithFilter(filter: filter): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetListRoomWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    createRoom(roomInformation: RoomInformation): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_room/CreateRoom", roomInformation, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    updateRoom(roomInformation: RoomInformation): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_room/UpdateRoom", roomInformation, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getAllFloor(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetAllFloor", {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getAllTypeRoom(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_room/GetAllTypeRoom", {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    deleteRoom(roomID: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/v1/api/manage_room/DeleteARoom?roomID=" + roomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }
}
