import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMnRoomFloorComponent } from './list-mn-room-floor.component';

describe('ListMnRoomFloorComponent', () => {
  let component: ListMnRoomFloorComponent;
  let fixture: ComponentFixture<ListMnRoomFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMnRoomFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMnRoomFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
