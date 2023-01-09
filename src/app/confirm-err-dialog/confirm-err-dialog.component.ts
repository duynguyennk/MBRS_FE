import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Constant } from '../constant/constant';

@Component({
  selector: 'app-confirm-err-dialog',
  templateUrl: './confirm-err-dialog.component.html',
  styleUrls: ['./confirm-err-dialog.component.css']
})
export class ConfirmErrDialogComponent implements OnInit {
  webUrl = environment.webUrl;
  confirm(title: string, DeleteFoodFailed: string) {
    throw new Error('Method not implemented.');
  }

  @Input() title!: string;
  @Input() message!: string;
  @Input() btnOkText!: string;
  checkIcon = Constant.IconYN.iconCancle
  // @Input() btnCancelText!: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
