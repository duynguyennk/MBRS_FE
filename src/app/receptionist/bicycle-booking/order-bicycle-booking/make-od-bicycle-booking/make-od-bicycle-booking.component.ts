import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { SearchBike } from 'src/app/model/searchBike';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderBikeService } from 'src/app/services/order-bike.service';

@Component({
  selector: 'app-make-od-bicycle-booking',
  templateUrl: './make-od-bicycle-booking.component.html',
  styleUrls: ['./make-od-bicycle-booking.component.css']
})
export class MakeOdBicycleBookingComponent implements OnInit {
  objectConfirm: any;
  customerIDGet: any;
  customerInformation: any;
  typeBikeID: any;
  dateRent: any;
  hoursGetBike: any;
  timeHire: any;
  numberOfBike: any;
  typeBikeName: any;
  price: any;
  totalPrice: any;
  responPaymentStatus: any;
  searchBike: any;
  roomName: any;
  isLoading = false;
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty
  customerForm = new UntypedFormGroup({
    checkInformation: new UntypedFormControl("",Validators.required),
    customerID: new UntypedFormControl(""),
    fullName: new UntypedFormControl(""),
    identifyNumber: new UntypedFormControl(""),
    dateOfBirth: new UntypedFormControl(""),
    phoneNumber: new UntypedFormControl(""),
    email: new UntypedFormControl(""),
  });
  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private orderBikeService: OrderBikeService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((res) => {
      this.typeBikeID = res.typeBikeID;
      this.dateRent = res.dateRent;
      this.hoursGetBike = res.hoursGetBike;
      this.timeHire = res.timeHire;
      this.numberOfBike = res.numberOfBike;
      this.typeBikeName = res.typeBikeName;
      this.price = res.price;
    });
    this.caculateTotalPrice();
  }
  caculateTotalPrice() {
    this.totalPrice =
      Number(this.price) * Number(this.timeHire) * Number(this.numberOfBike);
    this.loadSnipper();
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  onchangeSelect(textInput: any) {
    this.roomName = textInput;
  }
  searchInformation() {
    this.orderBikeService
      .getCustomerInformationByRoomName(this.roomName)
      .subscribe((res) => {
        if (res.data != null) {
          localStorage.setItem('customerOrderFood', JSON.stringify(res.data));
          this.customerIDGet =res.data[0].customerID
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

  onSubmit(){
    this.submitted = true
    if(this.customerForm.invalid){
      return
    }else{
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.payment.paymentContent,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.orderBikeService
            .paymentBikeOrder(
              this.totalPrice,
              this.timeHire,
              this.typeBikeName,
              this.numberOfBike
            )
            .subscribe((res) => {
              this.searchBike = new SearchBike(
                this.dateRent,
                this.hoursGetBike,
                this.numberOfBike,
                this.timeHire,
                this.customerIDGet,
                this.typeBikeID
              );
              localStorage.setItem('searchBike', JSON.stringify(this.searchBike));
              this.responPaymentStatus = res.url;
              window.location.href = this.responPaymentStatus;
            });
        }
      });
    }
  }


}
