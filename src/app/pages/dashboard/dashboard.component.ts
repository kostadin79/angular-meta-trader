import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { LiveQuotesComponent } from './live-quotes/live-quotes.component';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[
    NgIf,
    OpenPositionsComponent,
    LiveQuotesComponent,
    ChartsComponent
  ]
})
export class DashboardComponent {
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}
}
