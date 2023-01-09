import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomInforComponent } from './manage-room-infor.component';

describe('ManageRoomInforComponent', () => {
  let component: ManageRoomInforComponent;
  let fixture: ComponentFixture<ManageRoomInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRoomInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoomInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
