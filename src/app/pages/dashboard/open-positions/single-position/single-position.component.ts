import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-position',
  templateUrl: './single-position.component.html',
  styleUrls: ['./single-position.component.scss'],
})
export class SinglePositionComponent {
  @Input() openPosition: any;
}
