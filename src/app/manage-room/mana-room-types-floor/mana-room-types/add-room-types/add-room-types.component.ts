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
import { ManageTypeRoomService } from 'src/app/services/manage-type-room.service';

@Component({
  selector: 'app-add-room-types',
  templateUrl: './add-room-types.component.html',
  styleUrls: ['./add-room-types.component.css'],
})
export class AddRoomTypesComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  errMessage!: string;
  reader: FileReader | undefined;
  fileBuffer: any;
  imageBase64: any;
  fileTemp!: File
  progressPercent: any
  imagePath: any
  typeRoomID: any
  arrayFileTemp: any = [];
  arrayFile: any = [];
  arrayFileBase64: any = [];
  checkByteLimit: number = 0;
  countFile: number = 0;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast2to10C = Validate.contentValidate.atLeast2to10C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  isNum = Validate.contentValidate.isNum;
  //
  addRoomTypes = new UntypedFormGroup({
    typeRoomCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    typeRoomName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    numberOfChild: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    numberOfBed: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    numberOfAdult: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    numberOfView: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    numberOfAddingBed: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    numberOfBathRoom: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    price: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.decimal),
    ]),
    roomSquare: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.decimal),
    ]),
    contentIntroduceRoom: new UntypedFormControl(),
    safetyBox: new UntypedFormControl(),
    dryer: new UntypedFormControl(),
    wifi: new UntypedFormControl(),
    iron: new UntypedFormControl(),
    tivi: new UntypedFormControl(),
    fridge: new UntypedFormControl(),
    heaterBath: new UntypedFormControl(),
    bathTub: new UntypedFormControl(),
    airCondition: new UntypedFormControl(),
    heaterRoom: new UntypedFormControl(),
    dinnerTable: new UntypedFormControl(),
  });
  constructor(
    private manageTypeRoomService: ManageTypeRoomService,
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
      this.arrayFileTemp.push(file);
      this.checkByteLimit += file.size
      this.countFile++;
      if (this.checkByteLimit > 1000000) {
        formImage.clear();
        this.confirmationErrDialogService.confirm(
          Constant.ManaRoom_DIALOG_TITLE.title,
          Constant.ManaRoom_DIALOG_TITLE.AddImageTypeRoomMoreSize
        );
        this.arrayFileTemp = [];
        this.countFile = 0;
        this.checkByteLimit = 0;
        return;
      }
    }
    if (this.countFile > 5) {
      formImage.clear();
      this.confirmationErrDialogService.confirm(
        Constant.ManaRoom_DIALOG_TITLE.title,
        Constant.ManaRoom_DIALOG_TITLE.AddImageTypeRoomMoreFiveImage
      );
      this.arrayFileTemp = [];
      this.countFile = 0;
      this.checkByteLimit = 0;
      return;
    }
    else if (this.countFile > 0 && this.countFile < 5) {
      formImage.clear();
      this.confirmationErrDialogService.confirm(
        Constant.ManaRoom_DIALOG_TITLE.title,
        Constant.ManaRoom_DIALOG_TITLE.AddImageTypeRoomLessFiveImage
      );
      this.arrayFileTemp = [];
      this.countFile = 0;
      this.checkByteLimit = 0;
      return;
    }
    this.arrayFile = this.arrayFileTemp;
    this.arrayFileTemp = [];
  }
  // 
  onClear() {
    this.arrayFile = [];
  }
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

  async processFile(arrayFile: any, typeRoomID: number) {
    try {
      for (let file of arrayFile) {
        let arrayBuffer = await this.readFileAsync(file);
        const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
        this.imageBase64 = new ItemImage(typeRoomID, 'data:image/jpg;base64,' + dataBase64);
        this.arrayFileBase64.push(this.imageBase64);
      }
      this.manageTypeRoomService.postImage(this.arrayFileBase64).subscribe((event: HttpEvent<any>) => {
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
    if (this.addRoomTypes.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmAddRooms
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageTypeRoomService
            .createTypeRoom(this.addRoomTypes.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.typeRoomID = res.data
              if (this.arrayFile.length != 0) {
                this.processFile(this.arrayFile, this.typeRoomID);
              }
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.AddRooms
                );
                setTimeout(() => {
                  this.router
                    .navigateByUrl('manage-room/mana-room-types-floor/mana-room-types')
                    .then(() => {
                      window.location.reload();
                    });
                }, 4000);
              }
            }, (error) => {
              this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, error.error.errorMessage)
            });
        }
      });
    }
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  cancelForm() {
    this.router.navigateByUrl('manage-room/mana-room-types-floor/mana-room-types');
  }
}
