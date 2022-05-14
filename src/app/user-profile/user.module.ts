import { NgModule } from '@angular/core';
import { SharedModule } from 'ish-shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { UserRoutingModule } from './user-routes';

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UserProfileComponent],
})
export class UserModule {}
