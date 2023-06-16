import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { LiveQuotesComponent } from './live-quotes/live-quotes.component';
import { findAllCustomElements} from 'app-core/utils/test.helper';


describe('Dashboard Component', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let element: HTMLElement;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent(ChartsComponent),
        MockComponent(OpenPositionsComponent),
        MockComponent(LiveQuotesComponent),
      ],
      imports: [RouterTestingModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render app-live-quotes component on page', () => {
    component.isBrowser = true;
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toContain('app-live-quotes');
  });

  it('should render app-charts component on page', () => {
    component.isBrowser = true;
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toContain('app-charts');
  });

  it('should render app-open-positions component on page', () => {
    component.isBrowser = true;
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toContain('app-open-positions');
  });
});
