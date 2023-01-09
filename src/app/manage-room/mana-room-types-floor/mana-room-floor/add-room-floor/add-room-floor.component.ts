import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageFloorService } from 'src/app/services/manage-floor.service';

@Component({
  selector: 'app-add-room-floor',
  templateUrl: './add-room-floor.component.html',
  styleUrls: ['./add-room-floor.component.css'],
})
export class AddRoomFloorComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  errMessage!: string;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  //
  addRoomFloor = new UntypedFormGroup({
    floorCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    numberFloor: new UntypedFormControl('', [Validators.required]),
    floorName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
  });
  constructor(
    private manageCarService: ManageFloorService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
  }
  onSubmit() {
    this.submitted = true;
    if (this.addRoomFloor.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddFloor
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageCarService
            .createFloor(this.addRoomFloor.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              console.log(res);
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddFloor
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddFailedFloor
                );
              }
            });
            setTimeout(() => {
              this.router
                .navigateByUrl('manage-room/mana-room-types-floor/mana-room-floor')
                .then(() => {
                  window.location.reload();
                });
            }, 1500);
        }
      });
    }
  }
  cancelForm() {
    this.router.navigateByUrl('manage-room/mana-room-types-floor/mana-room-floor');
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
