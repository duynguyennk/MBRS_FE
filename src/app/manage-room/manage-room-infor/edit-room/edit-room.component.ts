import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { RoomInformation } from 'src/app/model/roomInformation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageRoomService } from 'src/app/services/manage-room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  errMessage!: string;
  floorList: any;
  typeRoomList: any;
  detailRoomInformation: any;
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  atLeast2C = Validate.contentValidate.atLeast2C;
  notspace = Validate.contentValidate.notspace;
  matchformat = Validate.contentValidate.matchformat;
  //
  createForm = new UntypedFormGroup({
    roomID: new UntypedFormControl(),
    roomCode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    roomName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter_number),
    ]),
    typeRoomID: new UntypedFormControl('', Validators.required),
    floorID: new UntypedFormControl('', Validators.required),
  });
  roomInformation: any;
  constructor(
    private route: ActivatedRoute,
    private manageRoomService: ManageRoomService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {
    this.roomInformation = new RoomInformation();
    if (route.snapshot.params['id']) {
      this.roomInformation.roomID = route.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadSnipper();
    this.getAllFloor();
    this.getAllTypeRoom();
    this.getRoomInformation();
  }
  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmEditRooms,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageRoomService
            .updateRoom(this.createForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.getRoomInformation();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaRoom_DIALOG_TITLE.title,
                  Constant.ManaRoom_DIALOG_TITLE.EditRooms
                );
                setTimeout(() => {
                  this.router
                    .navigateByUrl('/manage-room/manage-room-infor')
                    .then(() => {
                      window.location.reload();
                    });
                }, 1500);
              }
            }, (error) => {
              this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, error.error.errorMessage)
            });
        }
      });
    }
  }
  cancelForm() {
    this.router.navigateByUrl('/manage-room/manage-room-infor');
  }

  getRoomInformation() {
    this.manageRoomService
      .getTheRoomInformation(this.route.snapshot.params['id'])
      .subscribe((res) => {
        console.log(res);
        this.createForm.controls.roomID.setValue(res.data[0]['roomID']);
        this.createForm.controls.roomCode.setValue(
          res.data[0]['roomCode'].trim()
        );
        this.createForm.controls.roomName.setValue(
          res.data[0]['roomName'].trim()
        );
        this.createForm.controls.typeRoomID.setValue(res.data[0]['typeRoomID']);
        this.createForm.controls.floorID.setValue(res.data[0]['floorID']);
        console.log(res.data);
      });
  }
  onchangeSelect(typeRoomID: any) {
    this.manageRoomService
      .getDetailInformationRooms(typeRoomID)
      .subscribe((res) => {
        this.detailRoomInformation = res.data;
      });
  }
  getAllFloor() {
    this.manageRoomService.getAllFloor().subscribe((res) => {
      this.floorList = res.data;
    });
  }
  getAllTypeRoom() {
    this.manageRoomService.getAllTypeRoom().subscribe((res) => {
      this.typeRoomList = res.data;
    });
  }
  //
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
