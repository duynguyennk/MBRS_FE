import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: any;
  private hubConnection!: signalR.HubConnection
  public badgeCount: number = 0;
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  public AcivityEmployeeData:any;
  constructor(private http: HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl + '/sendNotification')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  updateStatusNotificationOrderReceptionist(notificationID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/notification/UpdateOrderNotificationReceptionist?notificationID=" + notificationID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getListOrderNotification(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/notification/GetNotification", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      this.changeNumberNewNotification();
    });
  }

    public addTransferActivityEmployeeDataListener = () => {
    this.hubConnection.on('TransferActivityData', (data) => {
      this.AcivityEmployeeData = data;
      console.log(data);
    });
  }

  public changeNumberNewNotification() {
    this.badgeCount = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].statusNotification) {
        this.badgeCount++;
      }
    }
  }

}
