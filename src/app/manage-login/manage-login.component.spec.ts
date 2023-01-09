import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoginComponent } from './manage-login.component';

describe('ManageLoginComponent', () => {
  let component: ManageLoginComponent;
  let fixture: ComponentFixture<ManageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
