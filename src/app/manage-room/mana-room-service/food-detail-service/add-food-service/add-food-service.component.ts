import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageFoodService } from 'src/app/services/manage-food.service';
import { DomSanitizer} from '@angular/platform-browser';
import { ItemImage} from 'src/app/model/itemImage';

@Component({
  selector: 'app-add-food-service',
  templateUrl: './add-food-service.component.html',
  styleUrls: ['./add-food-service.component.css'],
})
export class AddFoodServiceComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  typeFoodList: any;
  errMessage!: string;
  progressPercent: any;
  reader:FileReader | undefined;
  fileBuffer:any;
  imageBase64:any;
  foodID:any;
  fileTemp!: File
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  isNum = Validate.contentValidate.isNum;
  isLetter = Validate.contentValidate.isLetter;
  atLeast2to10C = Validate.contentValidate.atLeast2to10C;
  uploadedFiles: any[] = [];
  imagePath: any;
  checkClear:boolean = false;
  //
  foodServiceForm = new UntypedFormGroup({
    foodCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    foodName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    typeFoodID: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    quantity: new UntypedFormControl('', Validators.required),
    image: new UntypedFormControl(),
  });

  constructor(
    private domSanitizer : DomSanitizer,
    private foodService: ManageFoodService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
  ) {}
  //
  ngOnInit(): void {
    this.reader = new FileReader();
    this.reader.onload =() =>{
      this.fileBuffer = this.reader?.result;
    }
    this.loadSnipper();
    this.getAllTypeFood();
  }

  onSelect(event: any, formImage: any) {
    for (let file of event.files) {
      this.fileTemp = file;
      if (file.size > 200000) {
        formImage.clear();
        this.confirmationErrDialogService.confirm(
          Constant.ManaRoom_DIALOG_TITLE.title,
          Constant.ManaRoom_DIALOG_TITLE.AddImageTypeBikeMoreSize
        );
        this.checkClear=true;
        return;
      }
    }
    this.checkClear=false;
  }

  onClear() {
    this.checkClear=true;
  }
  
  //
  readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  arrayBufferToString(arrayBuffer: any, decoderType = 'uft-8') {
    let decoder = new TextDecoder(decoderType);
    return decoder.decode(arrayBuffer);
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async processFile(file: File,idObject : number) {
    try {
      let arrayBuffer = await this.readFileAsync(file);
      const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
      this.imageBase64 = new ItemImage(idObject,'data:image/jpg;base64,' + dataBase64);
      this.foodService.postImage(this.imageBase64).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progressPercent = Math.round(
              (event.loaded / (event?.loaded || 1)) * 100
            );
            break;
          case HttpEventType.Response:
            setTimeout(() => {}, 1500);
        }
      });
    } catch (error) {
      alert(error)
    }
  }

  getAllTypeFood() {
    this.foodService.getAllType().subscribe((res) => {
      this.typeFoodList = res.data;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.foodServiceForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddFood,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result == true && this.fileTemp != null && this.checkClear==false) {
          this.foodService
            .createFood(this.foodServiceForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.foodID = res.data;
              this.processFile(this.fileTemp,this.foodID);
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddFood
                );
                setTimeout(() => {
                  this.router
                    .navigateByUrl(
                      'manage-room/mana-room-service/food-detail-service'
                    )
                    .then(() => {
                      window.location.reload();
                    });
                }, 1500);
              }
            },(error) => {
              this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, error.error.errorMessage)
            });
        }
        else if(this.fileTemp == null || this.checkClear==true)
        {
          this.confirmationErrDialogService.confirm(
            Constant.ManaRoom_DIALOG_TITLE.title,
            Constant.ManaRoom_DIALOG_TITLE.UpdateImageFoodEmpty
          );
        }
      });
    }
  }
  
  cancelForm() {
    this.router.navigateByUrl(
      'manage-room/mana-room-service/food-detail-service'
    );
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
