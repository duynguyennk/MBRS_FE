import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../constant/constant';
import { LoadingComponent } from '../constant/loading';
import { TitleMessage } from '../model/titleMessage.type';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { DialogService } from '../services/dialog.service';
import { ManageFeedbackOrderRoomService } from '../services/manage-feedback-order-room.service';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {
  isLoading = false;
  ratingID: any;
  viewFeedback: any;
  objectConfirm: any;
  constructor(
    private route: ActivatedRoute,
    private manageFeedbackOrderRoomService: ManageFeedbackOrderRoomService,
    private confirmationDialog: ConfirmationDialogService,
    private dialogService: DialogService,
    private router: Router
  ) {}
  feedback = new UntypedFormGroup({
    orderID: new UntypedFormControl(),
    numberRatingConveniences: new UntypedFormControl(),
    numberRatingInterior: new UntypedFormControl(),
    numberRatingEmployee: new UntypedFormControl(),
    numberRatingService: new UntypedFormControl(),
    numberRatingHygiene: new UntypedFormControl(),
    numberRatingView: new UntypedFormControl(),
    contentRating: new UntypedFormControl()
  });
  ngOnInit(): void {
    this.loadSnipper();
    this.route.queryParams.subscribe(res => {
      this.feedback.controls.orderID.setValue(res.orderID);
      this.ratingID = res.ratingID;
    });
    if (this.ratingID != null) {
      this.loadViewRating();
    }
    // this.confirmationDialog.confirm(
    //   Constant.feedback.title,
    //   Constant.feedback.confirmFeedBack
    // );
  }
  onSubmit() {
    this.manageFeedbackOrderRoomService
      .createRoomFeedback(this.feedback.value)
      .subscribe(res => {});
  }
  loadViewRating() {
    this.manageFeedbackOrderRoomService
      .getViewFeedbackRoom(this.ratingID)
      .subscribe(res => {
        this.feedback.controls.numberRatingConveniences.setValue(
          res.data[0].numberRatingConveniences
        );
        this.feedback.controls.numberRatingInterior.setValue(
          res.data[0].numberRatingInterior
        );
        this.feedback.controls.numberRatingEmployee.setValue(
          res.data[0].numberRatingEmployee
        );
        this.feedback.controls.numberRatingService.setValue(
          res.data[0].numberRatingService
        );
        this.feedback.controls.numberRatingHygiene.setValue(
          res.data[0].numberRatingHygiene
        );
        this.feedback.controls.numberRatingView.setValue(
          res.data[0].numberRatingView
        );
        this.feedback.controls.contentRating.setValue(
          res.data[0].contentRating
        );
      });
  }
  loadSnipper() {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  sendFeedBack() {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.feedback.confirmFeedBackContent
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.confirmationDialog.confirm(
          Constant.feedback.title,
          Constant.feedback.thanksFeedBack
        );
        setTimeout(() => {
          this.router
            .navigateByUrl('/view-order?selected=1')
            .then(() => {
              window.location.reload();
            });
        }, 1500);
      }

    });
  }
}
