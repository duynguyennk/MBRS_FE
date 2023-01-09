import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomTypesFloorComponent } from './list-room-types-floor.component';

describe('ListRoomTypesFloorComponent', () => {
  let component: ListRoomTypesFloorComponent;
  let fixture: ComponentFixture<ListRoomTypesFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoomTypesFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomTypesFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
