import { LayoutModule } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveQuotesComponent } from './dashboard/live-quotes/live-quotes.component';
import { SinglePositionComponent } from './dashboard/open-positions/single-position/single-position.component';
import { RatesChartsComponent } from './dashboard/rates-charts/rates-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    SinglePositionComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
