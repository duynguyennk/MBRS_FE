import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { ArrayRoomStatus } from 'src/app/model/arrayRoomStatus';
import { StatusRoom } from 'src/app/model/StatusRoom';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { ViewStatusRoomService } from 'src/app/services/view-status-room.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-room-status',
  templateUrl: './list-room-status.component.html',
  styleUrls: ['./list-room-status.component.css'],
})
export class ListRoomStatusComponent implements OnInit {
  webUrl = environment.webUrl
  isLoading = false
  checkIn = new Date('2022/01/24');
  holdTiket = '29/11/2022 - 12:00:00'
  today: number = Date.now();
  listRoom: any;
  listFloor: any;
  statusRoom: any;
  listRoomSelect: Array<StatusRoom> = []
  listRoomArray: Array<StatusRoom> = []
  viewStatusObject: any;
  arrayViewStatus: Array<ArrayRoomStatus> = []
  numberOfRoomStatus: any;
  dateSelect: any;
  searchForm = new UntypedFormGroup({
    selectDate: new UntypedFormControl(),
    orderID : new UntypedFormControl(),
    valueStatus : new UntypedFormControl(),
  })
  constructor(private viewStatusRoomService: ViewStatusRoomService,private confirmationErrDialogService : ConfirmationErrDialogService, private router: Router, private route: ActivatedRoute,) {
    setInterval(() => {
      this.today = Date.now();
    }, 1);
  }

  public show: boolean = false;
  public _show: boolean = false;
  public buttonName: any = 'Show';

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadSnipper()
    this.route.queryParams.subscribe((res) => {
      this.dateSelect = res.date;
    });
    if (this.dateSelect != null) {
      this.searchForm.controls.selectDate.setValue(this.dateSelect);
      this.getListFloor(this.dateSelect);
    }
    this.searchForm.controls.orderID.setValue(-1);
    this.searchForm.controls.valueStatus.setValue(-1);
  }
  linkCreateBooking(){
    this.router.navigateByUrl("receptionist/create-booking/create-recep-booking/recep-booking-detail/list-rc-bk-status")
  }
  getNumberOfRoomStatus(searchStatusRoom: Date) {
    this.viewStatusRoomService.getNumberOfRoomStatus(searchStatusRoom).subscribe((res) => {
      this.numberOfRoomStatus = res.data
    });
  }
  updateStatusRoom()
  {
    this.viewStatusRoomService.updateStatusRoom(this.searchForm.value).subscribe((res) => {
      window.location.reload();
    });
  }
  getListRoom(searchStatusRoom: Date) {
    this.viewStatusRoomService.getListRoom(searchStatusRoom).subscribe((res) => {
      this.listRoom = res.data;
      for (var item of this.listFloor) {
        for (var item2 of this.listRoom) {
          if (item.floorID == item2.floorID) {
            this.statusRoom = new StatusRoom(item2.roomID, item2.roomName, item2.typeRoomName, item2.fullName, item2.checkIn, item2.checkOut, item2.statusRoom, item2.orderID, item2.floorID,item2.orderRoomDetailID)
            this.listRoomArray.push(this.statusRoom);
            if(item2.fullName != null && item2.statusRoom != 3)
            {
              this.listRoomSelect.push(this.statusRoom);
            }
          }
        }
        this.viewStatusObject = new ArrayRoomStatus(item.floorID, this.listRoomArray, item.floorName);
        this.arrayViewStatus.push(this.viewStatusObject);
        this.listRoomArray = [];
      }
      this.getNumberOfRoomStatus(searchStatusRoom);
    })
  }
  onchangeSelect(selectDate: Date) {
    this.dateSelect = selectDate;
  }

  getListFloor(searchStatusRoom: Date) {
    this.viewStatusRoomService.getListFloor().subscribe((res) => {
      this.listFloor = res.data;
      this.getListRoom(searchStatusRoom);
    })
  }
  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
  _toggle() {
    this._show = !this._show;
    if (this._show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
  onSubmit() {
    console.log(this.searchForm.controls.valueStatus.value)
    if(this.searchForm.controls.valueStatus.value!=-1)
    {
      console.log(this.searchForm.controls.orderID.value)
      if(this.searchForm.controls.orderID.value!=-1)
      {
        this.updateStatusRoom(); 
      }
      else
      {
        this.confirmationErrDialogService.confirm(Constant.statusRoom.title, Constant.statusRoom.errChangeStatus)
      }
    }
    else
    {
      this.confirmationErrDialogService.confirm(Constant.statusRoom.title, Constant.statusRoom.errChangeStatus2)
    }
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
