import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenPositionsComponent } from './open-positions.component';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { OpenPositionFacade } from 'app-core/facades/open-position.facade';
import { OpenPosition } from 'app-core/models/open-position.model';

describe('Open positions Component', () => {
  let fixture: ComponentFixture<OpenPositionsComponent>;
  let component: OpenPositionsComponent;
  let element: HTMLElement;
  let openPositionFacade: OpenPositionFacade;

  beforeEach(async () => {
    openPositionFacade = mock(OpenPositionFacade);
    openPositionFacade.loadInitialOpenPositions();
    when(openPositionFacade.getAllOpenPositions()).thenReturn(
      of([
        {
          id: 87559206,
          order: 87559206,
          open_time: '2023.05.10 23:19',
          type: 1,
          volume: 0.03,
          symbol: 'EURJPY',
          price: 147.524,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: -6.16,
          profit: -64.45,
          comment: '',
        },
        {
          id: 87559234,
          order: 87559234,
          open_time: '2023.05.10 23:20',
          type: 1,
          volume: 0.03,
          symbol: 'GBPJPY',
          price: 169.644,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: -8.77,
          profit: -79.76,
          comment: '',
        },
      ] as OpenPosition[])
    );

    await TestBed.configureTestingModule({
      declarations: [OpenPositionsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: OpenPositionFacade,
          useFactory: () => instance(openPositionFacade),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPositionsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
  it('should display 2 "price" rows when rendered', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.price')).toHaveLength(2);
  });
  it('should display 4 "direction" rows when rendered', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.open-time')).toHaveLength(2);
  });

  it('should have one element', () => {
    when(openPositionFacade.getAllOpenPositions()).thenReturn(
      of([
        {
          id: 87559206,
          order: 87559206,
          open_time: '2023.05.10 23:19',
          type: 1,
          volume: 0.03,
          symbol: 'EURJPY',
          price: 147.524,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: -6.16,
          profit: -64.45,
          comment: '',
        },
      ] as OpenPosition[])
    );
    fixture.detectChanges();

    expect(component.openPositions).toHaveLength(1);
  });
  it('should display position price in table', () => {
    when(openPositionFacade.getAllOpenPositions()).thenReturn(
      of([
        {
          id: 87559206,
          order: 87559206,
          open_time: '2023.05.10 23:19',
          type: 1,
          volume: 0.03,
          symbol: 'EURJPY',
          price: 147.524,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: -6.16,
          profit: -64.45,
          comment: '',
        },
      ] as OpenPosition[])
    );
    fixture.detectChanges();

    expect(element.querySelector('.price')?.textContent).toMatchInlineSnapshot(
      `"147.524"`
    );
  });
  it('should display  position open time', () => {
    when(openPositionFacade.getAllOpenPositions()).thenReturn(
      of([
        {
          id: 87559206,
          order: 87559206,
          open_time: '2023.05.10 23:19',
          type: 1,
          volume: 0.03,
          symbol: 'EURJPY',
          price: 147.524,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: -6.16,
          profit: -64.45,
          comment: '',
        },
      ] as OpenPosition[])
    );
    fixture.detectChanges();

    expect(
      element.querySelector('.open-time')?.textContent
    ).toMatchInlineSnapshot(`"2023.05.10 23:19"`);
  });
});
