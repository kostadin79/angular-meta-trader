import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Rate } from 'app-core/models/rate.model';
import {
  faPause,
  faSquareCaretDown,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { RatesFacade } from 'app-core/facades/rates.facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveQuotesComponent {
  faPause = faPause;
  faSquareCaretUp = faSquareCaretUp;
  faSquareCaretDown = faSquareCaretDown;
  ratesFacade: RatesFacade = inject(RatesFacade);
  rates = toSignal<Rate[]>(this.ratesFacade.getAllRates());

  trackByFn(index: number, rate: Rate) {
    return rate.bid;
  }

}
