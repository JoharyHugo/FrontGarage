import { Component ,Renderer2} from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { Router } from '@angular/router';
import { NavManagerComponent } from "../nav-manager/nav-manager.component";
import { ListeService } from './liste.service';
import { LoginclientService } from '../login-client/loginclient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste',
  imports: [ SearchComponent,  NavManagerComponent,FormsModule,CommonModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent {
  daty:string="";
  rdv:any=[];
  constructor(
      private renderer: Renderer2,private router:Router,private listeService:ListeService, private login:LoginclientService
    ){}
  ngOnInit(): void {
    var verif=this.login.verifToken();
    if (!verif) {
      this.router.navigate(['/loginManager']);
    }
    this.getRdv();
    //console.log(this.rdv)
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
  getRdv():void{
    this.listeService.getRdv(this.daty).subscribe(
      (data)=>{
        // console.log("Marques reçues:", data);
        // console.log("Type de data:", typeof data);
        // console.log("Est-ce un tableau ?", Array.isArray(data));
        //console.log(data);
        this.rdv=data;
        console.log("Données reçues :", JSON.stringify(this.rdv,null,2));
      },
      (error)=>{
        console.error('Error fetching data: ',error);
      }
    );
  }
  rdvService(idrdv:string):void{
    sessionStorage.setItem("rdv",idrdv);
    this.listeService.presencerdv(idrdv).subscribe(
      (data)=>{
        this.router.navigate(['/ajoutService']).then(() => {
          window.location.reload(); 
        });
      },
      (error)=>{
        console.error('Error fetching data: ',error);
      }
    );
    
  }
  rdvrefuser(idrdv:string):void{
    this.listeService.refusrdv(idrdv).subscribe(
      (data)=>{
        // console.log("Marques reçues:", data);
        // console.log("Type de data:", typeof data);
        // console.log("Est-ce un tableau ?", Array.isArray(data));
        // console.log(data);
        window.location.reload();
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
