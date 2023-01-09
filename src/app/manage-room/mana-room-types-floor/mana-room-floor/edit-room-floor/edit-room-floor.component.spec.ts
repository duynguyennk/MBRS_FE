import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomFloorComponent } from './edit-room-floor.component';

describe('EditRoomFloorComponent', () => {
  let component: EditRoomFloorComponent;
  let fixture: ComponentFixture<EditRoomFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoomFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
