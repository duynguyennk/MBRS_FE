import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllEmplComponent } from './list-all-empl.component';

describe('ListAllEmplComponent', () => {
  let component: ListAllEmplComponent;
  let fixture: ComponentFixture<ListAllEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllEmplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
