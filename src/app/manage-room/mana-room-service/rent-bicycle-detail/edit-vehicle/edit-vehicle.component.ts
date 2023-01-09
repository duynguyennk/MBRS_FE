import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Bike } from 'src/app/model/bike';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageBikeService } from 'src/app/services/manage-bike.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  typeBikeList: any;
  detailBikeInformation: any;
  bikeInformation: any;
  errMessage!: string;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  //
  RentBicycleForm = new UntypedFormGroup({
    bikeID: new UntypedFormControl(),
    bikeCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    bikeName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    typeBikeID: new UntypedFormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private bikeService: ManageBikeService,
    private router: Router,
    private dialogService: DialogService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.getAllTypeBike();
    this.getBikeInformation();
  }
  onchangeSelect(typeBikeID: any) {
    this.bikeService.getDetailInformationBike(typeBikeID).subscribe((res) => {
      this.detailBikeInformation = res.data;
    });
  }
  getAllTypeBike() {
    this.bikeService.getAllTypeBike().subscribe((res) => {
      this.typeBikeList = res.data;
    });
  }
  getBikeInformation() {
    this.bikeService
      .getTheBikeInformation(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.RentBicycleForm.controls.bikeID.setValue(res.data[0]['bikeID']);
        this.RentBicycleForm.controls.bikeCode.setValue(
          res.data[0]['bikeCode']
        );
        this.RentBicycleForm.controls.bikeName.setValue(
          res.data[0]['bikeName']
        );
        this.RentBicycleForm.controls.typeBikeID.setValue(
          res.data[0]['typeBikeID']
        );
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.RentBicycleForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmEditVehicle
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.bikeService
            .updateBike(this.RentBicycleForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.getBikeInformation();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditVehicle
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditFailedVehicle
                );
              }
            });
            setTimeout(() => {
              this.router
                .navigateByUrl(
                  'manage-room/mana-room-service/rent-bicycle-detail'
                )
                .then(() => {
                  window.location.reload();
                });
            }, 1500);
        }
      });
    }
  }
  cancelForm() {
    this.router.navigateByUrl(
      'manage-room/mana-room-service/rent-bicycle-detail'
    );
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
