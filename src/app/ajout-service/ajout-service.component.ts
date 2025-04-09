import { Component, Renderer2 } from '@angular/core';
import { NavManagerComponent } from "../nav-manager/nav-manager.component";
import { SearchComponent } from "../search/search.component";
import { FootersComponent } from "../footers/footers.component";
import { LoginclientService } from '../login-client/loginclient.service';
import { Router } from '@angular/router';
import { AjoutServiceService } from './ajout-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajout-service',
  imports: [NavManagerComponent, SearchComponent, FootersComponent,CommonModule,FormsModule],
  templateUrl: './ajout-service.component.html',
  styleUrl: './ajout-service.component.css'
})
export class AjoutServiceComponent {
  voitures:any;
  service:any;
  sous_service:any;
  data: any = {
    rdvId: "",
    idService: "",
    idVoiture: "",
    devis: [
     {}
    ]
  };
  detail:any=[];
  
  selections: any[] = [0];
  constructor(private renderer: Renderer2,private login:LoginclientService,private router:Router,private ajoutService:AjoutServiceService){}

  ngOnInit(): void{
    var verif=this.login.verifToken();
    if (!verif) {
      this.router.navigate(['/loginManager']);
    }
    this.getCar();
    this.getService();
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
  getCar():void{
    let rdvs: string | null = sessionStorage.getItem("rdv");

    if (rdvs !== null) {
      this.ajoutService.getVoitureRdv(rdvs).subscribe(
        (data)=>{
          this.voitures=data.voitures;
          //console.log(JSON.stringify(this.voitures,null,2));
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
    } else {
      console.error("La valeur de rdv est null !");
    }
    
  }
  getService():void{
    this.ajoutService.getService().subscribe(
      (data)=>{
        this.service=data;
        //console.log(JSON.stringify(this.service,null,2));
      },
      (error)=>{
        console.error('Error fetching data: ',error);
      }
    );
  }
  getSousService(idservice:string):void{
    if (idservice==="") {
      this.sous_service=null;
      this.selections=[0];
    }
    else{
      this.ajoutService.getSousService(idservice).subscribe(
        (data)=>{
          this.sous_service=data.sousServices;
          //console.log(JSON.stringify(this.sous_service,null,2));
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
    }
  }
  insertDataVoiture():void{
    this.data.rdvId=sessionStorage.getItem("rdv");
    console.log(JSON.stringify(this.data,null,2));
    this.ajoutService.insertData(this.data).subscribe({
      next:(response)=>{
        window.location.reload();
      },
      error:(error)=>{
        if (error.status === 400) {
          alert(error.error.message);
        } else {
          console.log("Probleme");
        }
        console.error("Erreur :", error);
      }
    });
  }
  getDetailVoiture(idVoiture: string): void {
    let rdvId: string | null = sessionStorage.getItem("rdv");
   /// console.log("Nandalo");
    if (!rdvId) {
        console.error("rdvId est null !");
        return;
    }
    
    this.ajoutService.getSousServiceVoiture(idVoiture, rdvId).subscribe(
        (response: any) => {
            this.detail = response; // Stocke les données reçues
            console.log("Détails du service récupérés :", JSON.stringify(this.detail,null,2));
        },
        (error) => {
            console.error("Erreur lors de la récupération des détails :", error);
        }
    );
  }
  /*Manampy ilay select */
  addSelect(): void {
    if (this.sous_service) {
      this.selections.push({});  
      this.data.devis.push({ idsousservice: "" });

    }
  }
  removeSelect():void{
    if (this.selections.length>1) {
      this.selections.pop();
      this.data.devis.pop();
    }
  }
  
  validationDevis():void{
    let rdvId: string | null = sessionStorage.getItem("rdv");
    /// console.log("Nandalo");
    if (!rdvId) {
        console.error("rdvId est null !");
        return;
    }
    //console.log("Nandalo");
    this.ajoutService.validation(rdvId).subscribe({
      next:(response)=>{
       alert("Valider avec succes");
       sessionStorage.removeItem("rdv");
       this.router.navigate(['/manager']).then(() => {
        window.location.reload(); 
      });
      },
      error:(error)=>{
        if (error.status === 400) {
          alert(error.error.message);
        } else {
          console.log("Probleme");
        }
        console.error("Erreur :", error);
      }
    });
  }
  liberation():void{
    this.detail=null;
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
