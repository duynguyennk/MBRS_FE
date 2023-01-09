import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAccountComponent } from './list-all-account.component';

describe('ListAllAccountComponent', () => {
  let component: ListAllAccountComponent;
  let fixture: ComponentFixture<ListAllAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
