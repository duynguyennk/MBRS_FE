import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccEmployeeComponent } from './create-acc-employee.component';

describe('CreateAccEmployeeComponent', () => {
  let component: CreateAccEmployeeComponent;
  let fixture: ComponentFixture<CreateAccEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
