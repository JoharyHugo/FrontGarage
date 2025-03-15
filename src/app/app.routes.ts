import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';


import { RendezClientComponent } from './rendez-client/rendez-client.component';
import { LoginClientComponent } from './login-client/login-client.component';

export const routes: Routes = [
  { path: '', component:LoginClientComponent },
  { path: 'client', component: ClientComponent },
  {path:'rendez',component:RendezClientComponent}
];
