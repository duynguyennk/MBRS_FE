import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { TitleMessage } from '../model/titleMessage.type';
import { NotiPopupComponent } from '../noti-popup/noti-popup.component';
import { Payload } from '../noti-popup/types/payload.type';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(data: TitleMessage) {
    return this.dialog.open(MatConfirmDialogComponent, {data,});
  }

  openTickPopup(data: Payload) {
    return this.dialog.open(NotiPopupComponent, {
      data,
    });
  }
}
