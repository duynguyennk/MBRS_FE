import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-display-view-profile',
  templateUrl: './display-view-profile.component.html',
  styleUrls: ['./display-view-profile.component.css'],
})
export class DisplayViewProfileComponent implements OnInit {
  isLoading = false;
  informationObject: any;
  accountID: any;
  objectConfirm: any;

  constructor(
    private loginService: LoginService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountID = localStorage.getItem('idUser');
    this.getCustomerInformationByID();
    this.loadSnipper();
  }
  getCustomerInformationByID() {
    this.loginService
      .getCustomerInformationByID(this.accountID)
      .subscribe((res) => {
        this.informationObject = res.data;
        console.log(res.data);
      });
  }
  loadSnipper() {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  dialogChangePass() {
    this.router.navigateByUrl('manage-login/change-pass');
  }
  // updateAccount(){
  //   var titleMessage: TitleMessage = {
  //     title: Constant.textNotice.title,
  //     titleMessageContent: Constant.view_profile.confirmUpdateAcc
  //   };
  //   this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
  //   this.objectConfirm.afterClosed().subscribe((result: any) => {
  //     if(result){
  //       this.router.navigateByUrl('view-profile/edit-profile')
  //     }
  //   })
  // }
}
