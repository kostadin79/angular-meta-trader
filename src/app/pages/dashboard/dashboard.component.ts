import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}
}
