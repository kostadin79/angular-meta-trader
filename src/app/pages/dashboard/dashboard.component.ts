import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'app-core/facades/app.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}
  ngOnInit() {
    this.appFacade.webSocketStatus$.subscribe((value) => {
      console.log('socket', value);
    });
  }
}
