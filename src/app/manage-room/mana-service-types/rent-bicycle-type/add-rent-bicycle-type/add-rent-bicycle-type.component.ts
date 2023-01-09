import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ItemImage } from 'src/app/model/itemImage';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageTypeBikeService } from 'src/app/services/manage-type-bike.service';

@Component({
  selector: 'app-add-rent-bicycle-type',
  templateUrl: './add-rent-bicycle-type.component.html',
  styleUrls: ['./add-rent-bicycle-type.component.css'],
})
export class AddRentBicycleTypeComponent implements OnInit {
  objectConfirm: any;
  errMessage!: string;
  isLoading = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  isNum = Validate.contentValidate.isNum;
  atLeast15C = Validate.contentValidate.atLeast15C;
  submitted = false;
  reader: FileReader | undefined;
  fileBuffer: any;
  imageBase64: any;
  fileTemp!: File
  progressPercent: any
  imagePath: any
  typeBikeID: any
  checkByteLimit: number = 0;
  countFile: number = 0;
  checkClear: boolean = false;
  //
  typeBikeForm = new UntypedFormGroup({
    typeBikeCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    typeBikeName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    numberOfSeat: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    color: new UntypedFormControl('', [Validators.required]),
    price: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.decimal),
    ]),
  });
  constructor(
    private manageTypeBikeService: ManageTypeBikeService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) { }

  ngOnInit(): void {
    this.reader = new FileReader();
    this.reader.onload = () => {
      this.fileBuffer = this.reader?.result;
    }
    this.loadSnipper();
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

  async processFile(file: File, typeBikeID: number) {
    try {
      let arrayBuffer = await this.readFileAsync(file);
      const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
      this.imageBase64 = new ItemImage(typeBikeID, 'data:image/jpg;base64,' + dataBase64);
      this.manageTypeBikeService.postImage(this.imageBase64).subscribe((event: HttpEvent<any>) => {
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
            setTimeout(() => { }, 1500);
        }
      });
    } catch (error) {
      alert(error)
    }
  }

  // 
  onSubmit() {
    this.submitted = true;
    if (this.typeBikeForm.invalid) {
      return;
    } else {
      // console.log(this.typeBikeForm.value)
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddVehicle,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result == true && this.fileTemp != null && this.checkClear==false) {
          this.manageTypeBikeService
            .createTypeBike(this.typeBikeForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.typeBikeID = res.data
              if (this.checkClear == false) {
                this.processFile(this.fileTemp, this.typeBikeID);
              }
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddVehicle
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddFailedVehicle
                );
              }
            });
          setTimeout(() => {
            this.router
              .navigateByUrl('manage-room/mana-service-types/rent-bicycle-type')
              .then(() => {
                window.location.reload();
              });
          }, 3000);
        }
        else if(this.fileTemp == null || this.checkClear==true)
        {
          this.confirmationErrDialogService.confirm(
            Constant.ManaRoom_DIALOG_TITLE.title,
            Constant.ManaRoom_DIALOG_TITLE.UpdateImageTypeBikeEmpty
          );
        }
      });
    }
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  
  cancelForm() {
    this.router.navigateByUrl(
      'manage-room/mana-service-types/rent-bicycle-type'
    );
  }
}
