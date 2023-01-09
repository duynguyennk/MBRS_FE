import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiPopupComponent } from './noti-popup.component';

describe('NotiPopupComponent', () => {
  let component: NotiPopupComponent;
  let fixture: ComponentFixture<NotiPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotiPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
