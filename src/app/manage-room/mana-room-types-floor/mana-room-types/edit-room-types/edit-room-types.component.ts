import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ImageTypeRoom } from 'src/app/model/imageTypeRoom';
import { ItemImage } from 'src/app/model/itemImage';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageTypeRoomService } from 'src/app/services/manage-type-room.service';

@Component({
  selector: 'app-edit-room-types',
  templateUrl: './edit-room-types.component.html',
  styleUrls: ['./edit-room-types.component.css'],
})
export class EditRoomTypesComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  errMessage!: string;
  reader: FileReader | undefined;
  fileBuffer: any;
  imageBase64: any;
  fileTemp!: File;
  progressPercent: any;
  imagePath: any;
  orderID: any;
  arrayFileTemp: any = [];
  arrayFile: any = [];
  arrayFileBase64: any = [];
  checkByteLimit: number = 0;
  countFile: number = 0;
  firstImage: any;
  secondImage: any;
  thirdImage: any;
  fourImage: any;
  fifthImage: any;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast2to10C = Validate.contentValidate.atLeast2to10C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  isNum = Validate.contentValidate.isNum;
  //
  addRoomTypes = new UntypedFormGroup({
    typeRoomID: new UntypedFormControl(),
    listUtilitiesID: new UntypedFormControl(),
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
    private route: ActivatedRoute,
    private manageTypeRoomService: ManageTypeRoomService,
    private router: Router,
    private dialogService: DialogService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) { }

  ngOnInit(): void {
    this.reader = new FileReader();
    this.reader.onload = () => {
      this.fileBuffer = this.reader?.result;
    }
    this.loadSnipper();
    this.getTypeRoomInformation();
  }

  getTypeRoomInformation() {
    this.manageTypeRoomService
      .getDetailInformationTypeRooms(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.firstImage = res.data[0]['firstImageBase64']
        this.secondImage = res.data[0]['secondImageBase64']
        this.thirdImage = res.data[0]['thirdImageBase64']
        this.fourImage = res.data[0]['fourthImageBase64']
        this.fifthImage = res.data[0]['fifthImageBase64']
        this.addRoomTypes.controls.typeRoomID.setValue(
          res.data[0]['typeRoomID']
        );
        this.addRoomTypes.controls.listUtilitiesID.setValue(
          res.data[0]['listUtilitiesID']
        );
        this.addRoomTypes.controls.typeRoomCode.setValue(
          res.data[0]['typeRoomCode']
        );
        this.addRoomTypes.controls.typeRoomName.setValue(
          res.data[0]['typeRoomName']
        );
        this.addRoomTypes.controls.numberOfChild.setValue(
          res.data[0]['numberOfChild']
        );
        this.addRoomTypes.controls.numberOfBed.setValue(
          res.data[0]['numberOfBed']
        );
        this.addRoomTypes.controls.numberOfAdult.setValue(
          res.data[0]['numberOfAdult']
        );
        this.addRoomTypes.controls.numberOfView.setValue(
          res.data[0]['numberOfView']
        );
        this.addRoomTypes.controls.numberOfAddingBed.setValue(
          res.data[0]['numberOfAddingBed']
        );
        this.addRoomTypes.controls.numberOfBathRoom.setValue(
          res.data[0]['numberOfBathRoom']
        );
        this.addRoomTypes.controls.price.setValue(res.data[0]['price']);
        this.addRoomTypes.controls.roomSquare.setValue(
          res.data[0]['roomSquare']
        );
        this.addRoomTypes.controls.contentIntroduceRoom.setValue(
          res.data[0]['contentIntroduceRoom']
        );
        this.addRoomTypes.controls.safetyBox.setValue(res.data[0]['safetyBox']);
        this.addRoomTypes.controls.dryer.setValue(res.data[0]['dryer']);
        this.addRoomTypes.controls.wifi.setValue(res.data[0]['wifi']);
        this.addRoomTypes.controls.iron.setValue(res.data[0]['iron']);
        this.addRoomTypes.controls.tivi.setValue(res.data[0]['tivi']);
        this.addRoomTypes.controls.fridge.setValue(res.data[0]['fridge']);
        this.addRoomTypes.controls.heaterBath.setValue(
          res.data[0]['heaterBath']
        );
        this.addRoomTypes.controls.bathTub.setValue(res.data[0]['bathTub']);
        this.addRoomTypes.controls.airCondition.setValue(
          res.data[0]['airCondition']
        );
        this.addRoomTypes.controls.heaterRoom.setValue(
          res.data[0]['heaterRoom']
        );
        this.addRoomTypes.controls.dinnerTable.setValue(
          res.data[0]['dinnerTable']
        );
      });
  }

  onDeleteImageTypeRoom(position: number) {
    this.manageTypeRoomService
      .deleteImageTypeRoom(position, this.addRoomTypes.controls.typeRoomID.value)
      .subscribe((res) => {
        this.errMessage = res.code
        if (this.errMessage === '200') {
          this.confirmationDialogService.confirm(
            Constant.ManaRoom_DIALOG_TITLE.title,
            Constant.ManaRoom_DIALOG_TITLE.DeleteImageTypeRoomSuccess
          );
          window.location.reload();
        } else {
          this.confirmationErrDialogService.confirm(
            Constant.ManaRoom_DIALOG_TITLE.title,
            Constant.ManaRoom_DIALOG_TITLE.DeleteImageTypeRoomFailed
          );
        }
      });
  }

  uploadAImage(event: any, formImage: any, position: number) {
    for (let file of event.files) {
      this.checkByteLimit += file.size
      if (this.checkByteLimit > 200000) {
        formImage.clear();
        this.confirmationErrDialogService.confirm(
          Constant.ManaRoom_DIALOG_TITLE.title,
          Constant.ManaRoom_DIALOG_TITLE.AddImageTypeRoomLess200kb
        );
        this.checkByteLimit = 0;
        return;
      }
      this.processAFile(file, position);
    }
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

  onClear() {
    this.arrayFile = [];
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
  async processAFile(file: File, position: number) {
    try {
      let arrayBuffer = await this.readFileAsync(file);
      const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
      this.imageBase64 = new ImageTypeRoom(position, this.addRoomTypes.controls.typeRoomID.value, 'data:image/jpg;base64,' + dataBase64);
      this.manageTypeRoomService.updateAImageTypeRoom(this.imageBase64).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            this.confirmationDialogService.confirm(
              Constant.ManaRoom_DIALOG_TITLE.title,
              Constant.ManaRoom_DIALOG_TITLE.UpdateImageTypeRoomSuccess
            );
            setTimeout(() => { window.location.reload(); }, 1500);
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
    }
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
            console.log(this.progressPercent);
            break;
          case HttpEventType.Response:
            setTimeout(() => { }, 3000);
        }
      });
    } catch (error) {
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addRoomTypes.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmEditRooms
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageTypeRoomService
            .updateTypeRoom(this.addRoomTypes.value)
            .subscribe((res) => {
              this.orderID = res.data
              this.errMessage = res.code;
              this.getTypeRoomInformation();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditRooms
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

  cancelForm() {
    this.router.navigateByUrl('manage-room/mana-room-types-floor/mana-room-types');
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

}
