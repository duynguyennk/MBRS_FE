import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../constant/constant';
import { LoadingComponent } from '../constant/loading';
import { TitleMessage } from '../model/titleMessage.type';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from '../services/confirmation-err-dialog.service';
import { DialogService } from '../services/dialog.service';
import { ManageFeedbackOrderRoomService } from '../services/manage-feedback-order-room.service';
 
@Component({
  selector: 'app-feed-back-service',
  templateUrl: './feed-back-service.component.html',
  styleUrls: ['./feed-back-service.component.css']
})
export class FeedBackServiceComponent implements OnInit {
  isLoading = false
  ratingID: any;
  viewFeedback: any;
  selected: any;
  code:any;
  objectConfirm:any;
  constructor(private route: ActivatedRoute, private router: Router, private manageFeedbackOrderRoomService: ManageFeedbackOrderRoomService,private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService) { }
  feedback = new UntypedFormGroup({
    orderID: new UntypedFormControl(),
    ratingNumber: new UntypedFormControl(),
    contentRating: new UntypedFormControl(),
    selectedOption: new UntypedFormControl()
  });
 
  ngOnInit(): void {
    this.loadSnipper();
    this.route.queryParams.subscribe((res) => {
      this.feedback.controls.orderID.setValue(res.orderID);
      this.feedback.controls.selectedOption.setValue(res.selected);
      this.ratingID = res.ratingID;
      this.selected = res.selected;
    });
    if (this.ratingID != null) {
      this.loadViewRating();
    }
  }
 
  onSubmit() {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.feedback.confirmFeedBack,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
      this.manageFeedbackOrderRoomService.createServiceFeedback(this.feedback.value).subscribe((res) => {
        this.code = res.code
        if (this.code === '200') {
          this.confirmationDialogService.confirm(
            Constant.feedback.title,
            Constant.feedback.feedbackSuccess
          );
        } else {
          this.confirmationErrDialogService.confirm(
            Constant.feedback.title,
            Constant.feedback.feedbackFailed
          );
        }
      });
      setTimeout(() => {
        this.router
          .navigateByUrl('/view-order?selected=2')
          .then(() => {
            window.location.reload();
          });
      }, 1500);
    }
    });
  }
 
  loadViewRating() {
    this.manageFeedbackOrderRoomService.getViewFeedbackService(this.ratingID, this.selected).subscribe((res) => {
      this.feedback.controls.ratingNumber.setValue(res.data[0].ratingNumber);
      this.feedback.controls.contentRating.setValue(res.data[0].contentRating);
    });
  }
 
  loadSnipper() {
    this.isLoading = true
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad)
  }
}
 

