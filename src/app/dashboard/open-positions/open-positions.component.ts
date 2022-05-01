import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

export interface OpenPosition {
  comment: string;
  commission: number;
  open_time: string;
  order: number;
  price: number;
  profit: number;
  sl: number;
  swap: number;
  symbol: string;
  tp: number;
  type: number;
  volume: number;
}

@Component({
  selector: 'terminal-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss'],
})
export class OpenPositionsComponent implements OnInit {
  openPositions: OpenPosition[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getInitialOpenPositions()
      .subscribe((data: OpenPosition[]) => {
        this.openPositions = data;
        console.log('OpenPositionsComponent');
      });

    this.dataService.openPositionsSource$.subscribe((data: OpenPosition[]) => {
      // console.log('OpenPositionsComponent---->',data);
      this.openPositions = data;
    });
  }
}
