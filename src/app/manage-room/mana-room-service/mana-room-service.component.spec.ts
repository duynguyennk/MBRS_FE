import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaRoomServiceComponent } from './mana-room-service.component';

describe('ManaRoomServiceComponent', () => {
  let component: ManaRoomServiceComponent;
  let fixture: ComponentFixture<ManaRoomServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaRoomServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaRoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
