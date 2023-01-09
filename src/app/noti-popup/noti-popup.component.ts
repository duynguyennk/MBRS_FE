import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payload } from './types/payload.type';

@Component({
  selector: 'app-noti-popup',
  templateUrl: './noti-popup.component.html',
  styleUrls: ['./noti-popup.component.css'],
})
export class NotiPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Payload,
    private dialogRef: MatDialogRef<NotiPopupComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeAll() {
    this.dialogRef.close();
  }
}
