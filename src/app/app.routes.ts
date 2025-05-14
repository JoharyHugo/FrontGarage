import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';


import { RendezClientComponent } from './rendez-client/rendez-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { VoitureComponent } from './voiture/voiture.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { ManagerComponent } from './manager/manager.component';
import { ListeComponent } from './liste/liste.component';
import { AjoutServiceComponent } from './ajout-service/ajout-service.component';
import { PieceComponent } from './piece/piece.component';
import { AjoutPieceComponent } from './ajout-piece/ajout-piece.component';
import { DevisComponent } from './devis/devis.component';

export const routes: Routes = [
  { path: '', component:LoginClientComponent },
  { path: 'client', component: ClientComponent },
  {path:'rendez',component:RendezClientComponent},
  {path:'voiture',component:VoitureComponent},
  {path:'loginManager',component:LoginManagerComponent},
  {path:'manager',component:ManagerComponent},
  {path:'listerdv',component:ListeComponent},
  {path:'ajoutService',component:AjoutServiceComponent},
  {path:'piece',component:PieceComponent},
  {path:'ajoutPiece',component:AjoutPieceComponent},
  {path:'devis',component:DevisComponent}
];
