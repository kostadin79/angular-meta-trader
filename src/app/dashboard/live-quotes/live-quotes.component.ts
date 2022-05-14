import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Rate } from '../../core/models/rates';
import {
  faPause,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';

export interface RateWithDiff extends Rate {
  direction?: string;
}

@Component({
  selector: 'app-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveQuotesComponent implements OnInit, OnDestroy {
  ratesListData: RateWithDiff[] = [];
  subscription!: Subscription;
  private destroy$ = new Subject();
  faPause = faPause;
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.dataService.getInitialRates.pipe()
    this.dataService
      .getInitialRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Rate[]) => {
        this.ratesListData = data;
        this.cd.detectChanges();
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
          this.cd.detectChanges();
          // console.log('newRate->', newRate);
        });
      });
  }

  changeChartsRate(event: any) {
    console.log('changeChartsRate()', event);
  }

  trackByFn(index: number, rate: Rate) {
    return rate.bid;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
