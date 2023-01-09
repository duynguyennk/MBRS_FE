import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaServiceTypesComponent } from './mana-service-types.component';

describe('ManaServiceTypesComponent', () => {
  let component: ManaServiceTypesComponent;
  let fixture: ComponentFixture<ManaServiceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaServiceTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManaServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
