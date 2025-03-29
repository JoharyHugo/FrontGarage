import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { SearchComponent } from "../search/search.component";
import { OnInit,Renderer2 } from '@angular/core';
import { FootersComponent } from "../footers/footers.component";
import { LoginclientService } from '../login-client/loginclient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VoitureService } from '../voiture/voiture.service';
import { Router } from '@angular/router';
import { RendezClientService } from './rendez-client.service';

@Component({
  selector: 'app-rendez-client',
  imports: [NavComponent, SearchComponent, FootersComponent,FormsModule ,CommonModule],
  templateUrl: './rendez-client.component.html',
  styleUrl: './rendez-client.component.css'
})
export class RendezClientComponent {
  blocks:any;
  voitures:any;
  couter:number=0;
  rdvs:any={};
  voitureSelections: any[] = [0];
  isDisableDate:boolean=false;
  constructor(
    private renderer: Renderer2,
    private login:LoginclientService,
    private voiture:VoitureService,
    private router:Router,
    private rdv:RendezClientService
  ) {}
  
  ngOnInit(): void {
    var verif=this.login.verifToken();
    if (!verif) {
      this.router.navigate(['/']);
    }
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
  inserdatardv():void{
    if (this.couter==0) {
      this.rdv.getBlock(this.rdvs.daterdv).subscribe(
        (data)=>{
          this.blocks=data;
          //console.log(JSON.stringify(data,null,2));
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
      this.couter=1;
      this.isDisableDate=true;
      this.voiture.getVoitureClient().subscribe(
        (data)=>{
          //console.log(JSON.stringify(data,null,2));
          this.voitures=data.voitures;
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
    }else{

    }
  }
  /*Manampy ilay select */
  addVoitureSelect(): void {
    if (this.couter==1) {
      this.voitureSelections.push({});  
    }
  }
  removeVoitureSelect():void{
    if (this.voitureSelections.length>1) {
      this.voitureSelections.pop();
    }
  }
  cancel():void{
    if (this.couter==1) {
      this.couter=0;
      this.isDisableDate=false;
      this.blocks=null;
      this.voitures=null;
      this.voitureSelections=[0];
    }
  
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
