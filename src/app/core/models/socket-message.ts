import { BaseRate } from 'app-core/models/rate.model';
import { BaseOpenPosition } from 'app-core/models/open-position.model';
import { BaseChart } from 'app-core/models/chart.model';

export interface SocketMessage<T> {
  data: T[];
  event: string;
}

export interface SocketRequest {
  event: string;
  data?: string | string[];
}

export type BaseSocketData = BaseRate & BaseOpenPosition & BaseChart;
