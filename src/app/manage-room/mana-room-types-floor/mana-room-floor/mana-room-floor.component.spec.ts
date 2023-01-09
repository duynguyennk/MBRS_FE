import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaRoomFloorComponent } from './mana-room-floor.component';

describe('ManaRoomFloorComponent', () => {
  let component: ManaRoomFloorComponent;
  let fixture: ComponentFixture<ManaRoomFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaRoomFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaRoomFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
