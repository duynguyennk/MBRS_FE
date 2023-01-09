import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmErrDialogComponent } from './confirm-err-dialog.component';

describe('ConfirmErrDialogComponent', () => {
  let component: ConfirmErrDialogComponent;
  let fixture: ComponentFixture<ConfirmErrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmErrDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmErrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
