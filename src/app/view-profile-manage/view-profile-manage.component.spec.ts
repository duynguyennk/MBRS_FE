import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileManageComponent } from './view-profile-manage.component';

describe('ViewProfileManageComponent', () => {
  let component: ViewProfileManageComponent;
  let fixture: ComponentFixture<ViewProfileManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfileManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
