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
import { ManageTypeFoodService } from 'src/app/services/manage-type-food.service';

@Component({
  selector: 'app-add-food-type',
  templateUrl: './add-food-type.component.html',
  styleUrls: ['./add-food-type.component.css']
})
export class AddFoodTypeComponent implements OnInit {
  objectConfirm:any
  isLoading = false
  errMessage!:string
  isEmpty = Validate.contentValidate.isEmpty
  atLeast2C = Validate.contentValidate.atLeast2C
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let
  submitted = false
  
  // 
  typeFoodForm = new UntypedFormGroup({
    typeFoodName: new UntypedFormControl("",[Validators.required, Validators.pattern(Validate.letter_number)]),
    typeFoodCode: new UntypedFormControl("",[Validators.required, Validators.pattern(Validate.letter_number)]),
  })
  constructor(private manageTypeFoodService: ManageTypeFoodService, 
    private router: Router, 
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService : DialogService ,
    private confirmationErrDialogService: ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.loadSnipper()
  }
  onSubmit() {
    this.submitted = true
    if(this.typeFoodForm.invalid){
      return
    }else{
      var titleMessage : TitleMessage={
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddFood
      }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.manageTypeFoodService.createTypeFoods(this.typeFoodForm.value).subscribe((res) => {
          this.errMessage = res.code
          if(this.errMessage === '200'){
            this.confirmationDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.AddFood)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.AddFoodFailed)
          }
        })
        setTimeout(() => {
          this.router
            .navigateByUrl('manage-room/mana-service-types/food-type')
            .then(() => {
              window.location.reload();
            });
        }, 1500);
      }
    })

    }
  }
  cancelForm(){
    this.router.navigateByUrl('manage-room/mana-service-types/food-type')
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
