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
import {NgClass, NgFor, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-live-quotes',
  templateUrl: './live-quotes.component.html',
  styleUrls: ['./live-quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[
    NgIf,
    NgFor,
    NgClass,
    FontAwesomeModule
  ]
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
