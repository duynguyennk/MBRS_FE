import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccCustomerComponent } from './create-acc-customer.component';

describe('CreateAccCustomerComponent', () => {
  let component: CreateAccCustomerComponent;
  let fixture: ComponentFixture<CreateAccCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
