import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomTypesComponent } from './edit-room-types.component';

describe('EditRoomTypesComponent', () => {
  let component: EditRoomTypesComponent;
  let fixture: ComponentFixture<EditRoomTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoomTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
