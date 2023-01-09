import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceTypeComponent } from './list-service-type.component';

describe('ListServiceTypeComponent', () => {
  let component: ListServiceTypeComponent;
  let fixture: ComponentFixture<ListServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
