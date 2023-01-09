import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccCustomerComponent } from './edit-acc-customer.component';

describe('EditAccCustomerComponent', () => {
  let component: EditAccCustomerComponent;
  let fixture: ComponentFixture<EditAccCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
