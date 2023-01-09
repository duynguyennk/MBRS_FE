import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMnRoomTypesComponent } from './list-mn-room-types.component';

describe('ListMnRoomTypesComponent', () => {
  let component: ListMnRoomTypesComponent;
  let fixture: ComponentFixture<ListMnRoomTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMnRoomTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMnRoomTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
