import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Rate } from '../../models/rates';
import {
  faPause,
  faSquareCaretUp,
  faSquareCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';

export interface RateWithDiff extends Rate {
  direction?: string;
}

@Component({
  selector: 'app-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
})
export class LiveQuotesComponent implements OnInit, OnDestroy {
  ratesListData: RateWithDiff[] = [];
  subscription!: Subscription;
  private destroy$ = new Subject();
  faPause = faPause;
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getInitialRates.pipe()
    this.dataService
      .getInitialRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Rate[]) => {
        this.ratesListData = data;
      });

    this.subscription = this.dataService.ratesSource$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Rate[]) => {
        data.map((newRate: Rate) => {
          const position = this.ratesListData.findIndex(
            (value) => value.symbol == newRate.symbol
          );
          this.ratesListData[position] = {
            ...newRate,
            direction:
              this.ratesListData[position].bid < newRate.bid ? 'UP' : 'DOWN',
          };
          // console.log('newRate->', newRate);
        });
      });
  }

  changeChartsRate(event: any) {
    console.log('changeChartsRate()', event);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
