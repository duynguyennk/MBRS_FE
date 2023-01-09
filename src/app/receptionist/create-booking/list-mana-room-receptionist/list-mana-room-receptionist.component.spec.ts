import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManaRoomReceptionistComponent } from './list-mana-room-receptionist.component';

describe('ListManaRoomReceptionistComponent', () => {
  let component: ListManaRoomReceptionistComponent;
  let fixture: ComponentFixture<ListManaRoomReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManaRoomReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManaRoomReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
