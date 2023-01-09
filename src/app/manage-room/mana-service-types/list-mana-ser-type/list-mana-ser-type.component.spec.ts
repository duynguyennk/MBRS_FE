import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManaSerTypeComponent } from './list-mana-ser-type.component';

describe('ListManaSerTypeComponent', () => {
  let component: ListManaSerTypeComponent;
  let fixture: ComponentFixture<ListManaSerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManaSerTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManaSerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
