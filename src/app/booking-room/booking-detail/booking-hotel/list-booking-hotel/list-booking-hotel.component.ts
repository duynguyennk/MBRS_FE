import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-list-booking-hotel',
  templateUrl: './list-booking-hotel.component.html',
  styleUrls: ['./list-booking-hotel.component.css'],
})
export class ListBookingHotelComponent implements OnInit {
  submitted = false
  isLoading = false;
  searchInformationString: any;
  searchInformationJason: any;
  totalPrice: any;
  days: any;
  responPaymentStatus: any
  customerInformation!: any;
  accountID: any;
  objectConfirm: any
  isEmpty = Validate.contentValidate.isEmpty
  isLetter = Validate.contentValidate.isLetter
  isNum = Validate.contentValidate.isNum
  isPhone = Validate.contentValidate.isPhone
  isEmail = Validate.contentValidate.isEmail
  atLeast2C = Validate.contentValidate.atLeast2C
  atLeast4C = Validate.contentValidate.atLeast4C
  atLeast10C = Validate.contentValidate.atLeast10C
  atLeast15C = Validate.contentValidate.atLeast15C
  atLeast12C = Validate.contentValidate.atLeast12C
  // 
  customerForm = new UntypedFormGroup({
    fullName: new UntypedFormControl("", [Validators.required, Validators.pattern(Validate.letter)]),
    identifyNumber: new UntypedFormControl("", [Validators.required, Validators.pattern(Validate.number)]),
    dateOfBirth: new UntypedFormControl("", [Validators.required]),
    phoneNumber: new UntypedFormControl("", [Validators.required, Validators.pattern(Validate.phone)]),
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
  });
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private orderRoomService: OrderRoomService
  ) { }

  ngOnInit(): void {
    this.loadSnipper()
    window.scrollTo(0, 0);
    this.accountID = localStorage.getItem("idUser");
    this.searchInformationString = localStorage.getItem('searchInformation');
    if (this.searchInformationString != null) {
      this.searchInformationJason = JSON.parse(this.searchInformationString);
    }
    if (this.accountID != null) {
      this.getCustomerInformation();
    }
    this.caculateDate();
  }
  createOrder() {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.paymentContent,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.orderRoomService.paymentRoom(this.totalPrice, this.searchInformationJason.typeRoomName, this.searchInformationJason.numberOfRoom, this.days).subscribe((res) => {
          this.responPaymentStatus = res.url;
          window.location.href = this.responPaymentStatus;
        })
      }
    })

  }
  caculateDate() {
    let dateCheckOut = new Date(this.searchInformationJason.checkOutDate);
    let dateCheckIn = new Date(this.searchInformationJason.checkInDate);
    this.days = Math.floor(
      (dateCheckOut.getTime() - dateCheckIn.getTime()) / 1000 / 60 / 60 / 24
    );
    this.totalPrice =
      this.days *
      Number(this.searchInformationJason.price) *
      Number(this.searchInformationJason.numberOfRoom);
  }
  getCustomerInformation() {
    this.orderRoomService.getCustomerInformationByID(this.accountID).subscribe(res => {
      this.customerInformation = res.data;
      console.log(this.customerInformation);
      localStorage.setItem('customerInformation', JSON.stringify(this.customerInformation));
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.customerForm.invalid) {
      return
    } else {
      if (this.accountID == null) {
        this.customerInformation = this.customerForm.value;
        localStorage.setItem(
          'customerInformation',
          JSON.stringify(this.customerInformation)
        );
      }
      this.router.navigateByUrl(
        'booking-room/booking-detail/:id/:checkin/:checkout/:numberOfRoom/:price/:typeRoomName/booking-hotel/booking-confirm'
      );
    }
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
