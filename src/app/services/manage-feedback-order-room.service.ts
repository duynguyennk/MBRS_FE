import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedbackRoom } from '../model/feedbackRoom';
import { FeedbackService } from '../model/feedbackService';

@Injectable({
  providedIn: 'root'
})
export class ManageFeedbackOrderRoomService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createRoomFeedback(feedbackRoom : FeedbackRoom): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/v1/api/manage_feedback_order_room_customer/CreateRoomFeedback",feedbackRoom,{
      headers : new HttpHeaders({
        'Authorization' : this.token
      })
    });
  }

  createServiceFeedback(feedbackService : FeedbackService): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/v1/api/manage_feedback_order_room_customer/CreateServiceFeedback",feedbackService,{
      headers : new HttpHeaders({
        'Authorization' : this.token
      })
    });
  }

  getViewFeedbackRoom(ratingID : number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_feedback_order_room_customer/GetRatingRoomByRatingID?ratingID="+ratingID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  
  getViewFeedbackService(ratingID : number,selectedOption:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_feedback_order_room_customer/GetRatingServiceByRatingID?ratingID="+ratingID+"&selectedOption="+selectedOption, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
