import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-d-payment-rc-bk-detail',
  templateUrl: './d-payment-rc-bk-detail.component.html',
  styleUrls: ['./d-payment-rc-bk-detail.component.css'],
})
export class DPaymentRcBkDetailComponent implements OnInit {
  submitted = false;
  isLoading = false;
  searchInformationString: any;
  searchInformationJason: any;
  totalPrice: any;
  days: any;
  responPaymentStatus: any;
  customerInformation!: any;
  objectConfirm: any;
  indentityOfCustomer: any;
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  isNum = Validate.contentValidate.isNum;
  isPhone = Validate.contentValidate.isPhone;
  isEmail = Validate.contentValidate.isEmail;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast4C = Validate.contentValidate.atLeast4C;
  atLeast10C = Validate.contentValidate.atLeast10C;
  atLeast15C = Validate.contentValidate.atLeast15C;
  atLeast12C = Validate.contentValidate.atLeast12C;
  abcd: any;
  defaultCheckYears:any
  //
  customerForm = new UntypedFormGroup({
    checkInformation: new UntypedFormControl(),
    customerID: new UntypedFormControl(),
    fullName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    identifyNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    dateOfBirth: new UntypedFormControl('', [Validators.required]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.phone),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private orderRoomService: OrderRoomService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper();
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 6570),
      'yyyy-MM-dd',
      'en-US','+0700'
    );
    this.searchInformationString = localStorage.getItem('searchInformation');
    if (this.searchInformationString != null) {
      this.searchInformationJason = JSON.parse(this.searchInformationString);
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
        this.orderRoomService
          .paymentRoom(
            this.totalPrice,
            this.searchInformationJason.typeRoomName,
            this.searchInformationJason.numberOfRoom,
            this.days
          )
          .subscribe((res) => {
            this.responPaymentStatus = res.url;
            window.location.href = this.responPaymentStatus;
          });
      }
    });
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
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    } else {
      this.customerInformation = this.customerForm.value;
      localStorage.setItem(
        'customerInformation',
        JSON.stringify(this.customerInformation)
      );
      this.router.navigateByUrl(
        'receptionist/create-booking/create-recep-booking/recep-booking-detail/:id/:checkin/:checkout/:numberOfRoom/:price/:typeRoomName/confirm-recep-payment'
      );
    }
  }
  searchInformation() {
    this.orderRoomService
      .getCustomerInformationByIdentity(this.indentityOfCustomer)
      .subscribe((res) => {
        console.log(res.data);
        if (res.data != null) {
          this.indentityOfCustomer = res.data[0].identifyNumber;
        } else {
          this.indentityOfCustomer = null;
        }
        console.log(this.indentityOfCustomer);
        if (this.indentityOfCustomer !== null) {
          this.customerForm.controls.customerID.setValue(res.data[0].customerID);
          this.customerForm.controls.fullName.setValue(res.data[0].fullName);
          this.customerForm.controls.identifyNumber.setValue(
            res.data[0].identifyNumber
          );
          this.customerForm.controls.dateOfBirth.setValue(
            res.data[0].dateOfBirthConvertForReceoptionist
          );
          this.customerForm.controls.phoneNumber.setValue(
            res.data[0].phoneNumber
          );
          this.customerForm.controls.email.setValue(res.data[0].email);
        } else {
          this.confirmationDialogService.confirm(
            Constant.receptionist.title,
            Constant.receptionist.confirmFormNull
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  }
  onchangeSelect(textInput: any) {
    this.indentityOfCustomer = textInput;
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
