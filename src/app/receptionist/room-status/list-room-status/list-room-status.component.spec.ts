import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomStatusComponent } from './list-room-status.component';

describe('ListRoomStatusComponent', () => {
  let component: ListRoomStatusComponent;
  let fixture: ComponentFixture<ListRoomStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoomStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
