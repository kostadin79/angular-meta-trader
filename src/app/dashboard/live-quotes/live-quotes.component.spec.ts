import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveQuotesComponent } from './live-quotes.component';

describe('LiveQuotesComponent', () => {
  let component: LiveQuotesComponent;
  let fixture: ComponentFixture<LiveQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
