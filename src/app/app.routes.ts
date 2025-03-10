import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'client', component: ClientComponent }
];
