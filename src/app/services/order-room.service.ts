import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderRoomInformation } from '../model/orderRoomInformation';
import { OrderRoomUnpaymentInformation } from '../model/orderRoomUnpaymentInformation';
import { SearchRoom } from '../model/searchRoom';

@Injectable({
  providedIn: 'root'
})
export class OrderRoomService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTypeRooms(searchRoom: SearchRoom): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetListTypeRoom?checkInt=" + searchRoom.checkInDate + "&checkOut=" + searchRoom.checkOutDate + "&numberOfRoom=" + searchRoom.numberOfRoom + "&numberOfChild=" + searchRoom.numberOfChild + "&numberOfAdult=" + searchRoom.numberOfAdult, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getTheRoomID(typeRoomID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetTheRoomID?typeRoomID=" + typeRoomID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getDetailInformationTypeRooms(typeRoomID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetTheTypeRoomInformation?typeRoomID=" + typeRoomID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getRatingList(typeRoomID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetRatingList?typeRoomID=" + typeRoomID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getRatingPercent(typeRoomID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetRatingPercent?typeRoomID=" + typeRoomID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  paymentRoom(price: number, nameTypeRoom: string, numberOfRooms: number, numberOfDays: number) {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/Payment?price=" + price + "&nameTypeRoom=" + nameTypeRoom + "&numberOfRooms=" + numberOfRooms + "&numberOfDays=" + numberOfDays, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  roomPaymentDeposit(price: number, nameTypeRoom: string, numberOfRooms: number, numberOfDays: number) {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/PaymentDeposit?price=" + price + "&nameTypeRoom=" + nameTypeRoom + "&numberOfRooms=" + numberOfRooms + "&numberOfDays=" + numberOfDays, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoomUnpayment(orderRoomUnpaymentInformation: OrderRoomUnpaymentInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoomUnpayment", orderRoomUnpaymentInformation, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoomCash(orderRoomUnpaymentInformation: OrderRoomUnpaymentInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoomCash", orderRoomUnpaymentInformation, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoomUnpaymentForCustomer(orderRoomUnpaymentInformation: OrderRoomUnpaymentInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoomUnpaymentForCustomer", orderRoomUnpaymentInformation, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoom(orderInformationViewModel: OrderRoomInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoom", orderInformationViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoomReceptionist(orderInformationViewModel: OrderRoomInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoomReceptionist", orderInformationViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderRoomForCustomer(orderInformationViewModel: OrderRoomInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_room/CreateOrderRoomForCustomer", orderInformationViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetCustomerInformationByID?accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByIdentity(identifyNumber: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_room/GetCustomerInformationByIdentity?identifyNumber=" + identifyNumber, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
