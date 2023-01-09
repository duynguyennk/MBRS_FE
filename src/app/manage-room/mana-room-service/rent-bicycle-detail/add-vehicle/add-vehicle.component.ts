import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  objectConfirm:any
  isLoading = false
  typeBikeList: any;
  detailBikeInformation: any;
  errMessage!:string
  // 
  submitted = false
  isEmpty = Validate.contentValidate.isEmpty
  atLeast2C = Validate.contentValidate.atLeast2C
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let
  // 
  RentBicycleForm = new UntypedFormGroup({
    bikeCode: new UntypedFormControl("",[Validators.required, Validators.pattern(Validate.letter_number)]),
    bikeName: new UntypedFormControl("",[Validators.required, Validators.pattern(Validate.letter_number)]),
    typeBikeID: new UntypedFormControl("",[Validators.required]),
  })
  constructor(private bikeService: ManageBikeService, 
    private router:Router,
    private dialogService : DialogService ,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.loadSnipper()
    this.getAllTypeBike();
  }
  getAllTypeBike() {
    this.bikeService.getAllTypeBike().subscribe((res) => {
      this.typeBikeList = res.data;
    })
  }
  onchangeSelect(typeBikeID: any) {
    this.bikeService.getDetailInformationBike(typeBikeID).subscribe((res) => {
      this.detailBikeInformation = res.data;
    })
  }
  onSubmit(){
    this.submitted = true
    if(this.RentBicycleForm.invalid){
      return
    }else{
      var titleMessage : TitleMessage={
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddVehicle
      }
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result:any)=>{
        if(result){
          this.bikeService.createBike(this.RentBicycleForm.value).subscribe((res) => {
            console.log(res)
            this.errMessage = res.code
            if(this.errMessage === '200'){
              this.confirmationDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.AddVehicle)
            }else{
              this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.AddFailedVehicle)
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
      })

    }
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  cancelForm(){
    this.router.navigateByUrl('manage-room/mana-room-service/rent-bicycle-detail')
  }
}
