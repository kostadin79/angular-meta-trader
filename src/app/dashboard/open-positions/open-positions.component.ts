import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { OpenPosition } from '../../core/models/open-position';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss'],
})
export class OpenPositionsComponent implements OnInit, OnDestroy {
  openPositions: OpenPosition[] = [];
  private destroy$ = new Subject();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getInitialOpenPositions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.openPositions = data;
        console.log('OpenPositionsComponent');
      });

    this.dataService.openPositionsSource$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: OpenPosition[]) => {
        // console.log('OpenPositionsComponent---->',data);
        this.openPositions = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
