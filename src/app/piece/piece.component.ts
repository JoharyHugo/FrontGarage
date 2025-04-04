import { Component, Renderer2 } from '@angular/core';
import { NavManagerComponent } from "../nav-manager/nav-manager.component";
import { SearchComponent } from "../search/search.component";
import { FootersComponent } from "../footers/footers.component";
import { CommonModule } from '@angular/common';
import { LoginclientService } from '../login-client/loginclient.service';
import { Router } from '@angular/router';
import { PieceService } from './piece.service';

@Component({
  selector: 'app-piece',
  imports: [NavManagerComponent, SearchComponent, FootersComponent,CommonModule],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css'
})
export class PieceComponent {
  isVisible: { [key: number]: boolean } = {};
  rdv:any;
    
constructor(private renderer:Renderer2,private login:LoginclientService,private router:Router,private piece:PieceService){}

ngOnInit(): void {
  var verif=this.login.verifToken();
    if (!verif) {
      this.router.navigate(['/loginManager']);
    }
  this.getRdv();
  // Liste des scripts à charger
  const scripts = [
    'vendor/jquery-3.2.1.min.js',
    'vendor/bootstrap-4.1/popper.min.js',
    'vendor/bootstrap-4.1/bootstrap.min.js',
    'vendor/slick/slick.min.js',
    'vendor/wow/wow.min.js',
    'vendor/animsition/animsition.min.js',
    'vendor/bootstrap-progressbar/bootstrap-progressbar.min.js',
    'vendor/counter-up/jquery.waypoints.min.js',
    'vendor/counter-up/jquery.counterup.min.js',
    'vendor/circle-progress/circle-progress.min.js',
    'vendor/perfect-scrollbar/perfect-scrollbar.js',
    'vendor/chartjs/Chart.bundle.min.js',
    'vendor/select2/select2.min.js',
    'js/main.js'
  ];

  this.loadScriptsSequentially(scripts);
}

toggleSousListe(index: number) {
  this.isVisible[index] = !this.isVisible[index];
}
getRdv():void{
  this.piece.getRdv().subscribe(
    (data)=>{
      this.rdv=data;
      //console.log(JSON.stringify(this.rdv,null,2));
    },
    (error)=>{
      console.error('Error fetching data: ',error);
    }
  );
}
private loadScriptsSequentially(scriptUrls: string[]): void {
  const loadScript = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = () => {
        //console.log(`Script loaded: ${url}`);
        resolve(); // Résoudre la promesse une fois le script chargé
      };
      script.onerror = () => {
        console.error(`Failed to load script: ${url}`);
        reject(new Error(`Failed to load script: ${url}`)); // Rejeter la promesse en cas d'erreur
      };
      this.renderer.appendChild(document.body, script);
    });
  };

  // Charger les scripts un par un
  let promiseChain = Promise.resolve(); // Commencer avec une promesse résolue

  scriptUrls.forEach((url) => {
    promiseChain = promiseChain.then(() => loadScript(url));
  });
}
}
