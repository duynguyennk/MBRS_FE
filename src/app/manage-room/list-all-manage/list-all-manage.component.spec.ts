import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllManageComponent } from './list-all-manage.component';

describe('ListAllManageComponent', () => {
  let component: ListAllManageComponent;
  let fixture: ComponentFixture<ListAllManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
