import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaRoomTypesFloorComponent } from './mana-room-types-floor.component';

describe('ManaRoomTypesFloorComponent', () => {
  let component: ManaRoomTypesFloorComponent;
  let fixture: ComponentFixture<ManaRoomTypesFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaRoomTypesFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaRoomTypesFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
