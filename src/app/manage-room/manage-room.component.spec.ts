import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomComponent } from './manage-room.component';

describe('ManageRoomComponent', () => {
  let component: ManageRoomComponent;
  let fixture: ComponentFixture<ManageRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
