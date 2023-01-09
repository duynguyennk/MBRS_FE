import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-rent-bicycle-type',
  templateUrl: './edit-rent-bicycle-type.component.html',
  styleUrls: ['./edit-rent-bicycle-type.component.css'],
})
export class EditRentBicycleTypeComponent implements OnInit {
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
  orderID: any
  checkClear:boolean = false;
  imageBase64Update:any;
  //
  typeBikeForm = new UntypedFormGroup({
    typeBikeID: new UntypedFormControl(),
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
    private route: ActivatedRoute,
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
    this.getTypeCarAirportInformation();
  }

  getTypeCarAirportInformation() {
    this.manageTypeBikeService
      .getTheTypeBikeInformation(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.imageBase64Update=res.data[0]['imageBase64']
        this.typeBikeForm.controls.typeBikeID.setValue(
          res.data[0]['typeBikeID']
        );
        this.typeBikeForm.controls.typeBikeCode.setValue(
          res.data[0]['typeBikeCode']
        );
        this.typeBikeForm.controls.typeBikeName.setValue(
          res.data[0]['typeBikeName']
        );
        this.typeBikeForm.controls.price.setValue(res.data[0]['price']);
        this.typeBikeForm.controls.numberOfSeat.setValue(
          res.data[0]['numberOfSeat']
        );
        this.typeBikeForm.controls.color.setValue(res.data[0]['color']);
      });
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

  async processFile(file: File, orderID: number) {
    try {
      let arrayBuffer = await this.readFileAsync(file);
      const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
      this.imageBase64 = new ItemImage(orderID, 'data:image/jpg;base64,' + dataBase64);
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
  onSubmit() {
    this.submitted = true;
    if (this.typeBikeForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmEditVehicle,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageTypeBikeService
            .updateTypeBike(this.typeBikeForm.value)
            .subscribe((res) => {
              this.getTypeCarAirportInformation();
              this.orderID = res.data
              if(this.checkClear==false && this.fileTemp != null)
              {
              this.processFile(this.fileTemp, this.typeBikeForm.controls.typeBikeID.value);
              }
              this.errMessage = res.code;
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
              .navigateByUrl('manage-room/mana-service-types/rent-bicycle-type')
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
      'manage-room/mana-service-types/rent-bicycle-type'
    );
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
