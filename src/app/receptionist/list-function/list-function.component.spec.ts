import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunctionComponent } from './list-function.component';

describe('ListFunctionComponent', () => {
  let component: ListFunctionComponent;
  let fixture: ComponentFixture<ListFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
