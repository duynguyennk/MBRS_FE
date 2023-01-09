import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '../constant/constant';
import { TitleMessage } from '../model/titleMessage.type';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css'],
})
export class MatConfirmDialogComponent implements OnInit {
  // accept = {status: true, message:"Đồng ý"};
  // decline = {status: false, message:"Không đồng ý"};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TitleMessage,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
