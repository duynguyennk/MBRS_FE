import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaEmployeeBehaviorComponent } from './mana-employee-behavior.component';

describe('ManaEmployeeBehaviorComponent', () => {
  let component: ManaEmployeeBehaviorComponent;
  let fixture: ComponentFixture<ManaEmployeeBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaEmployeeBehaviorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManaEmployeeBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
