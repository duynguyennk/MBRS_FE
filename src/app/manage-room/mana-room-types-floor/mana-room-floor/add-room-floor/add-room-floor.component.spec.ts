import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomFloorComponent } from './add-room-floor.component';

describe('AddRoomFloorComponent', () => {
  let component: AddRoomFloorComponent;
  let fixture: ComponentFixture<AddRoomFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
