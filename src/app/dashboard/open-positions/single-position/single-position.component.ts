import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'terminal-single-position',
  templateUrl: './single-position.component.html',
  styleUrls: ['./single-position.component.scss']
})
export class SinglePositionComponent implements OnInit {
@Input() openPosition: any;
  constructor() { }

  ngOnInit(): void {

  }

}
