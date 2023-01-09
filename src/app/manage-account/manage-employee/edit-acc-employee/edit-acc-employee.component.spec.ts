import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccEmployeeComponent } from './edit-acc-employee.component';

describe('EditAccEmployeeComponent', () => {
  let component: EditAccEmployeeComponent;
  let fixture: ComponentFixture<EditAccEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
