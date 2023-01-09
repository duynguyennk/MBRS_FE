import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Constant } from '../constant/constant';
import { LoadingComponent } from '../constant/loading';
import { CancelOrderRoomCustomer } from '../model/cancelOrderRoomCustomer';
import { TitleMessage } from '../model/titleMessage.type';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from '../services/confirmation-err-dialog.service';
import { DialogService } from '../services/dialog.service';
import { ViewOrderCustomerService } from '../services/view-order-customer.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  webUrl = environment.webUrl
  isLoading = false
  submitted =false
  accountID: any;
  listOrder: any;
  objectConfirm: any
  selectedOption: any
  selectedEvent: any
  cancelOrderRoomCustomer: any
  codeStatusAPI: any;
  searchForm = new UntypedFormGroup({
    filterName: new UntypedFormControl("", Validators.required)
  })
  constructor(private viewOrderCustomerService: ViewOrderCustomerService, private dialogService: DialogService, private route: ActivatedRoute, private router: Router, private confirmationDialogService: ConfirmationDialogService, private confirmationErrDialogService: ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.loadSnipper()
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((res) => {
      this.selectedOption = res.selected
      this.selectedEvent = res.selected
      this.searchForm.controls.filterName.setValue(this.selectedOption)
    });
    this.accountID = localStorage.getItem("idUser");
    this.getCustomerInformationByID();
  }
  loadSnipper() {
    this.isLoading = true
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad)
  }
  getListOrderRoom(customerID: number) {
    this.viewOrderCustomerService.getListOrderRoom(customerID).subscribe(res => {
      this.listOrder = res.data;
    })
  }
  getListOrderBike(customerID: number) {
    this.viewOrderCustomerService.getListOrderBike(customerID).subscribe(res => {
      this.listOrder = res.data;
    })
  }
  getListOrderFood(customerID: number) {
    this.viewOrderCustomerService.getListOrderFood(customerID).subscribe(res => {
      this.listOrder = res.data;
    })
  }

  cancelOrderRoom(orderID: number, typeOrder: number, contentPayment: string, price: number) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.receptionist.confirmCancelOrder
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((res: any) => {
      if (res) {
        if (typeOrder == 2) {
          price = (((price * 30) / 100) * 50) / 100
          contentPayment = contentPayment + " *Cần hoàn Lại " + price + "VNĐ cho khách hàng";
        }
        else {
          price = (price * 90) / 100
          contentPayment = contentPayment + " *Cần hoàn Lại " + price + "VNĐ cho khách hàng";
        }
        this.cancelOrderRoomCustomer = new CancelOrderRoomCustomer(orderID, contentPayment)
        this.viewOrderCustomerService.cancelOrderRoomCustomer(this.cancelOrderRoomCustomer).subscribe(res => {
          this.getCustomerInformationByID();
          this.codeStatusAPI = res.code;
          if (this.codeStatusAPI === '200') {
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.cancelOrderSuccess)
          } else {
            this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.cancelOrderFailed)
          }
        })
      }
    });
  }
  onchangeSelect(valueSelected: number) {
    this.selectedEvent = valueSelected;
  }
  onSubmit() {

  }
  getCustomerInformationByID() {
    this.viewOrderCustomerService.getCustomerInformationByID(this.accountID).subscribe(res => {
      if (this.selectedOption == 1) {
        this.getListOrderRoom(res.data[0].customerID);
      }
      else if (this.selectedOption == 2) {
        this.getListOrderFood(res.data[0].customerID);
      }
      else {
        this.getListOrderBike(res.data[0].customerID);
      }
    })

  }

}
