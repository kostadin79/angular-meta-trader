import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LiveQuotesComponent } from './live-quotes.component';

import { instance, mock, when } from 'ts-mockito';
import { RatesFacade } from 'app-core/facades/rates.facade';

import { of } from 'rxjs';
import { Rate } from 'app-core/models/rate.model';
import { RatesDirection } from 'app-core/models/enumerations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { findAllCustomElements } from 'app-core/utils/test.helper';

describe('Live Quotes Component', () => {
  let fixture: ComponentFixture<LiveQuotesComponent>;
  let component: LiveQuotesComponent;
  let element: HTMLElement;
  let ratesFacade: RatesFacade;

  beforeEach(async () => {
    ratesFacade = mock(RatesFacade);
    when(ratesFacade.getAllRates()).thenReturn(
      of([
        {
          id: 'EURUSD',
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
          direction: RatesDirection.Down,
        },
        {
          id: 'USDJPY',
          bid: 140.124,
          ask: 140.139,
          symbol: 'USDJPY',
          direction: RatesDirection.Up,
        },
        {
          id: 'EURJPY',
          bid: 150.21,
          ask: 150.23,
          symbol: 'EURJPY',
          direction: RatesDirection.Initial,
        },
        {
          id: 'USDCAD',
          bid: 1.3634,
          ask: 1.3636,
          symbol: 'USDCAD',
          direction: RatesDirection.Initial,
        },
      ] as Rate[])
    );

    await TestBed.configureTestingModule({
      declarations: [LiveQuotesComponent],
      imports: [RouterTestingModule, FontAwesomeModule],
      providers: [
        {
          provide: RatesFacade,
          useFactory: () => instance(ratesFacade),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveQuotesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
  it('should display 4 "symbol" rows when rendered', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.col-3')).toHaveLength(4);
  });
  it('should display 4 "direction" rows when rendered', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.col-1')).toHaveLength(4);
  });

  it('should have one element', () => {
    when(ratesFacade.getAllRates()).thenReturn(
      of([
        {
          id: 'EURUSD',
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
          direction: RatesDirection.Down,
        }
      ])
    );
    fixture.detectChanges();

    expect(component.ratesListData).toHaveLength(1);
  });
  it('should display symbol content EURUSD when rendered', () => {
    when(ratesFacade.getAllRates()).thenReturn(
      of([
        {
          id: 'EURUSD',
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
          direction: RatesDirection.Down,
        }
      ])
    );
    fixture.detectChanges();

    expect(element.querySelector('.col-3')?.textContent).toMatchInlineSnapshot(
      `"EURUSD"`
    );
  });
  it('should render icon', () => {
    when(ratesFacade.getAllRates()).thenReturn(
      of([
        {
          id: 'EURUSD',
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
          direction: RatesDirection.Down,
        }
      ])
    );
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toMatchInlineSnapshot(`
      [
        "fa-icon",
      ]
    `);
  });
});
