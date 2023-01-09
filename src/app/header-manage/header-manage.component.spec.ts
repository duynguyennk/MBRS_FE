import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderManageComponent } from './header-manage.component';

describe('HeaderManageComponent', () => {
  let component: HeaderManageComponent;
  let fixture: ComponentFixture<HeaderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
