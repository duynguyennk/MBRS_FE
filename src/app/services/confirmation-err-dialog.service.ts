import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmErrDialogComponent } from '../confirm-err-dialog/confirm-err-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationErrDialogService {

 
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    // btnOkText: string = 'OK',
    // btnCancelText: string = 'Cancel',
    // dialogSize: 'sm' | 'lg' = 'sm'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmErrDialogComponent, {
      size: '300px',
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    // modalRef.componentInstance.btnOkText = btnOkText;
    // modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
