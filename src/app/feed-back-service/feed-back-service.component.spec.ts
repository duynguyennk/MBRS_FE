import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackServiceComponent } from './feed-back-service.component';

describe('FeedBackServiceComponent', () => {
  let component: FeedBackServiceComponent;
  let fixture: ComponentFixture<FeedBackServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedBackServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedBackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
