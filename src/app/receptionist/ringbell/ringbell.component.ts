import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ringbell',
  templateUrl: './ringbell.component.html',
  styleUrls: ['./ringbell.component.css']
})
export class RingbellComponent {
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  title: string = 'Browser Push Notifications!';
  private apiUrl = environment.apiUrl;
  constructor(private _notificationService: PushNotificationService,private http: HttpClient, private router: Router , public signalrService : SignalrService) {
    this._notificationService.requestPermission();
  }
  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.addTransferChartDataListener();
    this.startHttpRequest();
    this.loadNotification();
  }
  private startHttpRequest = () => {
    this.http.get(this.apiUrl+'/v1/api/notification/SendNotification')
      .subscribe(res => {
      })
  }
  loadNotification()
  {
    this.signalrService.getListOrderNotification().subscribe((res) => {
      this.signalrService.data = res.data;
    });
  }
  changeStatusNotification(notificationID : number,typeNotification : number)
  {
    this.signalrService.updateStatusNotificationOrderReceptionist(notificationID).subscribe((res)=>{
      this.signalrService.getListOrderNotification().subscribe((res)=>{
        this.signalrService.data= res.data;
        this.signalrService.changeNumberNewNotification();
      })
    })
    if(typeNotification == 1)
    {
      this.router.navigateByUrl('/receptionist/create-booking');
    }
    else if(typeNotification == 2)
    {
      this.router.navigateByUrl('/receptionist/food-booking');
    }
    else if(typeNotification == 3)
    {
      this.router.navigateByUrl('/receptionist/bicycle-booking');
    }
  }
  // scroll
  
  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

}
