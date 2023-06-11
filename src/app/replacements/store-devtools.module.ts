import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const storeDevtoolsModule = [
  StoreDevtoolsModule.instrument({
    maxAge: 200,
  }),
];
