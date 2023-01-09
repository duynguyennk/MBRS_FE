import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRcBkDetailComponent } from './list-rc-bk-detail.component';

describe('ListRcBkDetailComponent', () => {
  let component: ListRcBkDetailComponent;
  let fixture: ComponentFixture<ListRcBkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRcBkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRcBkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
