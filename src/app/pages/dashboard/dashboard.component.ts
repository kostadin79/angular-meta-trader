import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigurationFacade } from 'app-core/facades/configuration.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isBrowser = isPlatformBrowser(this.platformId);
  constructor( private appFacade: ConfigurationFacade, @Inject(PLATFORM_ID) private platformId: string) {}
  ngOnInit() {
    // this.appFacade.webSocketStatus$.subscribe((value) => {
    //   console.log('socket', value);
    // });
    console.log('isPlatformBrowser', this.isBrowser);
  }
}
