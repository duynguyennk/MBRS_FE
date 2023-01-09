import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNoneComponent } from './footer-none.component';

describe('FooterNoneComponent', () => {
  let component: FooterNoneComponent;
  let fixture: ComponentFixture<FooterNoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterNoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
