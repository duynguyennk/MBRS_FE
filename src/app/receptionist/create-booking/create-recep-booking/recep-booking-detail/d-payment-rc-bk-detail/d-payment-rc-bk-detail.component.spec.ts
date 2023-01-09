import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPaymentRcBkDetailComponent } from './d-payment-rc-bk-detail.component';

describe('DPaymentRcBkDetailComponent', () => {
  let component: DPaymentRcBkDetailComponent;
  let fixture: ComponentFixture<DPaymentRcBkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPaymentRcBkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DPaymentRcBkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
