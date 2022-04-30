import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Rate } from '@terminal/api-interfaces';

export interface RateWithDiff extends Rate {
  direction?: string;
}


@Component({
  selector: 'terminal-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
})
export class LiveQuotesComponent implements OnInit {
  ratesListData: RateWithDiff[] = [];
  subscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getInitialRates.pipe()
    this.dataService.getInitialRates().subscribe((data: Rate[]) => {
      this.ratesListData = data;
    });

    this.subscription = this.dataService.ratesSource$.subscribe(
      (data: Rate[]) => {
        data.map((newRate: Rate) => {
          const position = this.ratesListData.findIndex(
            (value) => value.symbol == newRate.symbol
          );
          this.ratesListData[position] = {
            ...newRate,
            direction:
              this.ratesListData[position].bid < newRate.bid
                ? 'UP'
                : 'DOWN',
          };
          // console.log('newRate->', newRate);
        });
      }
    );
  }

  changeChartsRate(event){
    console.log('changeChartsRate()',event)
  }
}
