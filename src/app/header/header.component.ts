import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Constant } from '../constant/constant';
import { ConfirmationErrDialogService } from '../services/confirmation-err-dialog.service';
import { FilterUsingServiceCustomerService } from '../services/filter-using-service-customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  webUrl = environment.webUrl
  objectConfirm: any
  userInformation: any;
  typeSelected!: string;
  fullNameUser!: string;
  role: any;
  accountID: any;

  constructor(private router: Router, private filterUsingServiceCustomerService: FilterUsingServiceCustomerService, private confirmationErrDialogService: ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.userInformation = localStorage.getItem("UserInformation");
    this.role = localStorage.getItem("Role");
  }
  clearStorage() {
    localStorage.clear();
  }
  checkUsingServiceCustomer() {
    this.accountID = localStorage.getItem("idUser");
    this.filterUsingServiceCustomerService.checkUsingCustomerService(this.accountID).subscribe(res => {
      if (res.data != 1) {
        this.confirmationErrDialogService.confirm(
          Constant.ManaCRUD_DIALOG_TITLE.title,
          Constant.ManaCRUD_DIALOG_TITLE.ServiceFilter
        );
      }
      else {
        this.router.navigateByUrl('/booking-service')
      }
    })
  }
  checkUsingRoomOrder() {
    if (this.role == null) {
      this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.service.serviceLogin)
    }
    else {
      this.router.navigateByUrl('/booking-room')
    }
  }

  useService() {
    this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.service.serviceLogin)
  }
}
