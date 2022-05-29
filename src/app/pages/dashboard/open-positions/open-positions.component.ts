import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'app-core/services/data.service';
import { OpenPosition } from 'app-core/models/open-position.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenPositionFacade } from 'app-core/facades/open-position.facade';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss'],
})
export class OpenPositionsComponent implements OnInit, OnDestroy {
  openPositions: OpenPosition[] = [];
  private destroy$ = new Subject();
  constructor(
    private openPositionsFacade: OpenPositionFacade,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.openPositionsFacade.loadInitialOpenPositions();

    this.openPositionsFacade.startOpenPositionsStream();

    this.openPositionsFacade.getAllOpenPositions().subscribe((value) => {
      // console.log('getAllRates', value);

      // this.addDirectionToRate(value);
      this.openPositions = value;
      this.cd.detectChanges();
    });

    // this.openPositionsFacade.getOpenPositionsEntities().subscribe((value) => {
    //   console.log('getRatesEntities', value);
    // });
    // this.openPositionsFacade.getSelectedOpenPositions().subscribe((value) => {
    //   console.log('getSelectedRate', value);
    // });
    // this.openPositionsFacade.gtTotalOpenPositions().subscribe((value) => {
    //   console.log('gtTotalRates', value);
    // });

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
