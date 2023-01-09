import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constant } from '../constant/constant';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() btnOkText!: string;
  checkIcon = Constant.IconYN.iconConfirm
  // @Input() btnCancelText!: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    return this.activeModal.close(false);
  }

  public accept() {
   return this.activeModal.close(true);
  }

  public dismiss() {
   return this.activeModal.dismiss(false);
  }
}
