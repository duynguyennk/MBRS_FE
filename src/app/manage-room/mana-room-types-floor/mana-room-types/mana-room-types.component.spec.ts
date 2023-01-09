import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaRoomTypesComponent } from './mana-room-types.component';

describe('ManaRoomTypesComponent', () => {
  let component: ManaRoomTypesComponent;
  let fixture: ComponentFixture<ManaRoomTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaRoomTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaRoomTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
