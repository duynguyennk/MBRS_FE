import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageFloorService } from 'src/app/services/manage-floor.service';

@Component({
  selector: 'app-edit-room-floor',
  templateUrl: './edit-room-floor.component.html',
  styleUrls: ['./edit-room-floor.component.css'],
})
export class EditRoomFloorComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  floorList: any;
  floorInformation: any;
  errMessage!: string;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  //
  addRoomFloor = new UntypedFormGroup({
    floorID: new UntypedFormControl(),
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
    private route: ActivatedRoute,
    private manageCarService: ManageFloorService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.getFloorInformation();
  }
  getFloorInformation() {
    this.manageCarService
      .getDetailInformationFloor(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.addRoomFloor.controls.floorID.setValue(res.data[0]['floorID']);
        this.addRoomFloor.controls.floorCode.setValue(res.data[0]['floorCode']);
        this.addRoomFloor.controls.numberFloor.setValue(
          res.data[0]['numberFloor']
        );
        this.addRoomFloor.controls.floorName.setValue(res.data[0]['floorName']);
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addRoomFloor.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmEditFloor
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageCarService
            .updateFloor(this.addRoomFloor.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.getFloorInformation();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditFloor
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditFailedFloor
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
