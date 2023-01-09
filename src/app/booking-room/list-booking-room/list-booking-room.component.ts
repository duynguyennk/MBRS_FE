import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-list-booking-room',
  templateUrl: './list-booking-room.component.html',
  styleUrls: ['./list-booking-room.component.css'],
})
export class ListBookingRoomComponent implements OnInit {
  currentRate = 3;
  typeRoomList: any;
  informationSearch: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  isLoading = false;
  submitted = false;
  formBooking!: UntypedFormGroup;
  isEmpty = Validate.contentValidate.isEmpty;
  roomListArray: any = [];
  tempArray: any = [];
  newArray: any = [];
  today:any;
  defaultCheckOut:any;
  defaultCheckIn:any;
  checkDateCancel:any;
  checkCancel:any;
  checkBoxArray: any = [
    {
      id: 1,
      type: 'checkbox',
      rangePrice: '0 VNĐ - 200,000 VNĐ',
      isSelected: false,
    },
    {
      id: 2,
      type: 'checkbox',
      rangePrice: '200,000 VNĐ - 400,000 VNĐ',
      isSelected: false,
    },
    {
      id: 3,
      type: 'checkbox',
      rangePrice: '400,000 VNĐ - 600,000 VNĐ',
      isSelected: false,
    },
    {
      id: 4,
      type: 'checkbox',
      rangePrice: '600,000 VNĐ - 800,000 VNĐ',
      isSelected: false,
    },
    {
      id: 5,
      type: 'checkbox',
      rangePrice: '800,000 VNĐ - 1,000,000 VNĐ',
      isSelected: false,
    },
    {
      id: 6,
      type: 'checkbox',
      rangePrice: 'Trên 1,000,000 VNĐ',
      isSelected: false,
    },
  ];

  constructor(
    private orderRoomService: OrderRoomService,
    private router: Router,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {
    this.formBooking = new UntypedFormGroup(
      {
        checkInDate: new UntypedFormControl('', [Validators.required]),
        checkOutDate: new UntypedFormControl('', [Validators.required]),
        numberOfRoom: new UntypedFormControl('', Validators.required),
        numberOfAdult: new UntypedFormControl('', Validators.required),
        numberOfChild: new UntypedFormControl('', Validators.required),
      },
      [Validators.required, this.dateRangeValidator, this.dateRangeValidator1]
    );
  }
  ngOnInit(): void {
    this.loadSnipper();
    window.scrollTo(0, 0);
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US','+0700');
    console.log(this.today)
    this.defaultCheckOut = new Date();
    this.defaultCheckOut = formatDate(
      this.defaultCheckOut.setDate(this.defaultCheckOut.getDate() + 1),
      'yyyy-MM-dd',
      'en-US','+0700'
    );
    console.log(this.defaultCheckOut)
    this.formBooking.controls.checkInDate.setValue(this.today);
    this.formBooking.controls.checkOutDate.setValue(this.defaultCheckOut);
    this.formBooking.controls.numberOfRoom.setValue(1);
    this.formBooking.controls.numberOfAdult.setValue(1);
    this.formBooking.controls.numberOfChild.setValue(1);
  }
  productFilter() {}
  // onSearchChange(searchRoom: SearchRoom) {
  //   this.informationSearch=searchRoom;
  //   this.orderRoomService.getTypeRooms(searchRoom).subscribe((res) => {
  //   // this.isLoading = true
  //     if(this.informationSearch.invalid){
  //       return
  //     }else{
  //       this.typeRoomList = res.data;
  //     this.page = 1;
  //     }
  //   })
  // }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formBooking.invalid == true) {
      console.log(this.formBooking.invalid);
      return;
    } else {
      this.informationSearch = this.formBooking.value;
      this.orderRoomService
        .getTypeRooms(this.formBooking.value)
        .subscribe((res) => {
          if(res.code === '200'){
            this.typeRoomList = res.data;
          this.roomListArray = res.data;
          this.page = 1;
          this.checkDateCancel = new Date(this.informationSearch.checkInDate)
          this.checkDateCancel = formatDate(this.checkDateCancel.setDate(this.checkDateCancel.getDate() - 3), 'yyyy-MM-dd', 'en-US');
          if(this.checkDateCancel > this.today)
          {
            this.checkCancel = true;
          }
          else
          {
            this.checkCancel = false;
          }
          }else{
            this.confirmationErrDialogService.confirm(Constant.loadData.title,Constant.loadData.errData)
          }
          
        });
    }
  }

  changeStatusCheckBox(id: number, status: boolean) {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].id == id) {
        this.checkBoxArray[i].isSelected = status;
      }
    }
  }
  checkStatusCheckBox(): boolean {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].isSelected) {
        return true;
      }
    }
    return false;
  }
  filterPriceSelectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.roomListArray.filter(
      (e: any) => e.price > minPrice && e.price <= maxPrice
    );
    this.typeRoomList = [];
    this.newArray.push(this.tempArray);
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.typeRoomList.push(obj);
      }
    }
  }
  filterPriceUnselectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.typeRoomList.filter(
      (e: any) => e.price <= minPrice || e.price > maxPrice
    );
    this.typeRoomList = [];
    this.newArray = [];
    this.newArray.push(this.tempArray);
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.typeRoomList.push(obj);
      }
    }
  }

  onChange(event: any) {
    if (event.target.checked) {
      if (event.target.value == 1) {
        this.filterPriceSelectedChange(0, 200000);
        this.changeStatusCheckBox(1, true);
      } else if (event.target.value == 2) {
        this.filterPriceSelectedChange(200000, 400000);
        this.changeStatusCheckBox(2, true);
      } else if (event.target.value == 3) {
        this.filterPriceSelectedChange(400000, 600000);
        this.changeStatusCheckBox(3, true);
      } else if (event.target.value == 4) {
        this.filterPriceSelectedChange(600000, 800000);
        this.changeStatusCheckBox(4, true);
      } else if (event.target.value == 5) {
        this.filterPriceSelectedChange(800000, 1000000);
        this.changeStatusCheckBox(5, true);
      } else if (event.target.value == 6) {
        this.filterPriceSelectedChange(1000000, 50000000);
        this.changeStatusCheckBox(6, true);
      }
    } else {
      if (event.target.value == 1) {
        this.filterPriceUnselectedChange(0, 200000);
        this.changeStatusCheckBox(1, false);
      } else if (event.target.value == 2) {
        this.filterPriceUnselectedChange(200000, 400000);
        this.changeStatusCheckBox(2, false);
      } else if (event.target.value == 3) {
        this.filterPriceUnselectedChange(400000, 600000);
        this.changeStatusCheckBox(3, false);
      } else if (event.target.value == 4) {
        this.filterPriceUnselectedChange(600000, 800000);
        this.changeStatusCheckBox(4, false);
      } else if (event.target.value == 5) {
        this.filterPriceUnselectedChange(800000, 1000000);
        this.changeStatusCheckBox(5, false);
      } else if (event.target.value == 6) {
        this.filterPriceUnselectedChange(1000000, 50000000);
        this.changeStatusCheckBox(6, false);
      }
      if (this.checkStatusCheckBox() == false) {
        this.newArray = [];
        this.typeRoomList = this.roomListArray;
      }
    }
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.formBooking && this.formBooking.get('checkInDate')!.value;
    const to = this.formBooking && this.formBooking.get('checkOutDate')!.value;
    if (from && to) {
      invalid = !(new Date(from).valueOf() < new Date(to).valueOf());
    }
    return invalid ? { invalidRange: { from, to } } : (this.typeRoomList = []);
  };

  private dateRangeValidator1: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    // let exDate = new Date("0000/00/01");
    let date = Date.now();
    let invalid = false;
    const from = this.formBooking && this.formBooking.get('checkInDate')!.value;
    const to = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    if (from && to) {
      invalid = !(new Date(from).valueOf() >= new Date(to).valueOf());
    }
    return invalid ? { invalidRange: { from, to } } : (this.typeRoomList = []);
  };
  // private dateRangeValidatorAge: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   let date = Date.now();
  //   let invalid = false;
  //   const from = this.formBooking && this.formBooking.get('checkInDate')!.value;
  //   const to = date;

  //   if (from - to >= 18) {
  //     invalid = new Date(from).valueOf() <= new Date(to).valueOf();
  //   }
  //   return invalid ? { invalidRange: { from, to } } : (this.typeRoomList = []);
  // };
}
