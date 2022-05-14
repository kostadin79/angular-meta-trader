import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  declarations: [],
  exports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class SharedModule {}
