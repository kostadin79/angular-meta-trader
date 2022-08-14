import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

    this.openPositionsFacade
      .getAllOpenPositions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.openPositions = value;
        this.cd.detectChanges();
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
