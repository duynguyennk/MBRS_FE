import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManaRoomDetailComponent } from './list-mana-room-detail.component';

describe('ListManaRoomDetailComponent', () => {
  let component: ListManaRoomDetailComponent;
  let fixture: ComponentFixture<ListManaRoomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManaRoomDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManaRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
