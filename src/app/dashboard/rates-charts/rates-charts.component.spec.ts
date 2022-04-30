import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesChartsComponent } from './rates-charts.component';

describe('RatesChartsComponent', () => {
  let component: RatesChartsComponent;
  let fixture: ComponentFixture<RatesChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
