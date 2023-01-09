import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeRoom } from '../model/typeRoom';
import { filter } from '../model/filter';
import { environment } from 'src/environments/environment';
import { ImageTypeRoom } from '../model/imageTypeRoom';

@Injectable({
    providedIn: 'root'
})
export class ManageTypeRoomService {
    private token = environment.tokenHeader + localStorage.getItem("TokenData");
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getTypeRooms(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_room/GetListTypeRoom", {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getDetailInformationTypeRooms(typeRoomID: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_room/GetTheTypeRoomInformation?typeRoomID=" + typeRoomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    getTypeRoomsWithFilter(filter: filter): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_room/GetListTypeRoomWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    createTypeRoom(typeRoom: TypeRoom): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_room/CreateTypeRoom", typeRoom, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    updateTypeRoom(typeRoom: TypeRoom): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_room/UpdateTypeRoom", typeRoom, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    deleteTypeRoom(typeRoomID: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/v1/api/manage_type_room/DeleteATypeRoom?typeRoomID=" + typeRoomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    deleteImageTypeRoom(position:number,typeRoomID:number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "/v1/api/manage_type_room/DeleteImageTypeRoom?position=" + position+"&typeRoomID="+typeRoomID, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }


    upload(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_room/UploadPhoto", formData, {
            headers: new HttpHeaders({
                'Authorization': this.token
            })
        });
    }

    public postImage(itemImage: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_room/UpdateImageTypeRoom", itemImage, {
            reportProgress: true,
            observe: 'events',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.token
            }),
        });
    }

    public updateAImageTypeRoom(imageTypeRoom: ImageTypeRoom): Observable<any> {
        return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_room/UpdateAImageTypeRoom", imageTypeRoom, {
            reportProgress: true,
            observe: 'events',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.token
            }),
        });
    }


}

