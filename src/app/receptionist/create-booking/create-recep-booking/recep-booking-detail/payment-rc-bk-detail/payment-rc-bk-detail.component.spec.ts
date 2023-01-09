import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRcBkDetailComponent } from './payment-rc-bk-detail.component';

describe('PaymentRcBkDetailComponent', () => {
  let component: PaymentRcBkDetailComponent;
  let fixture: ComponentFixture<PaymentRcBkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRcBkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRcBkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
