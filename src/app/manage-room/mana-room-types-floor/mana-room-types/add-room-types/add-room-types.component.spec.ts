import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomTypesComponent } from './add-room-types.component';

describe('AddRoomTypesComponent', () => {
  let component: AddRoomTypesComponent;
  let fixture: ComponentFixture<AddRoomTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
