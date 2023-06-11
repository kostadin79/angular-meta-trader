import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Rate } from 'app-core/models/rate.model';
import {
  faPause,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { RatesFacade } from 'app-core/facades/rates.facade';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveQuotesComponent implements OnInit, OnDestroy {
  ratesListData: Rate[] = [];
  faPause = faPause;
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;
  private destroy$ = new Subject();

  constructor(
    private ratesFacade: RatesFacade,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.ratesFacade
      .getAllRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.ratesListData = value;
        this.cd.detectChanges();
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
