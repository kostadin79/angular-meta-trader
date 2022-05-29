import { Component, OnInit } from '@angular/core';
import { ConfigurationFacade } from 'app-core/facades/configuration.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private appFacade: ConfigurationFacade) {}
  ngOnInit() {
    // this.appFacade.webSocketStatus$.subscribe((value) => {
    //   console.log('socket', value);
    // });
  }
}
