import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'app-core/services/data.service';
import { Rate } from 'app-core/models/rate.model';
import {
  faPause,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { RatesFacade } from 'app-core/facades/rates.facade';

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
    private dataService: DataService,
    private ratesFacade: RatesFacade,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ratesFacade.loadInitialRates();

    this.ratesFacade.startRatesStream();

    this.ratesFacade.getAllRates().subscribe((value) => {

      // this.addDirectionToRate(value);
      this.ratesListData = value;
      this.cd.detectChanges();
    });

    // this.ratesFacade.getRatesEntities().subscribe((value) => {
    //   console.log('getRatesEntities', value);
    // });
    // this.ratesFacade.getSelectedRate().subscribe((value) => {
    //   console.log('getSelectedRate', value);
    // });
    // this.ratesFacade.gtTotalRates().subscribe((value) => {
    //   console.log('gtTotalRates', value);
    // });

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
