import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRcBkStatusComponent } from './list-rc-bk-status.component';

describe('ListRcBkStatusComponent', () => {
  let component: ListRcBkStatusComponent;
  let fixture: ComponentFixture<ListRcBkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRcBkStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRcBkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
