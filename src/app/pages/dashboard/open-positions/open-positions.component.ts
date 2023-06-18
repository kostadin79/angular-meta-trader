import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OpenPosition } from 'app-core/models/open-position.model';
import { OpenPositionFacade } from 'app-core/facades/open-position.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[
    NgIf,
    NgFor
  ]
})
export class OpenPositionsComponent  {
  private openPositionsFacade = inject( OpenPositionFacade)
  positions = toSignal<OpenPosition[]>(
    this.openPositionsFacade.getAllOpenPositions()
  );
}
