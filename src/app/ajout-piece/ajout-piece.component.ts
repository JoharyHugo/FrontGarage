import { Component, Renderer2 } from '@angular/core';
import { NavManagerComponent } from "../nav-manager/nav-manager.component";
import { SearchComponent } from "../search/search.component";
import { FootersComponent } from "../footers/footers.component";
import { AjoutPieceService } from './ajout-piece.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-ajout-piece',
  imports: [NavManagerComponent, SearchComponent, FootersComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './ajout-piece.component.html',
  styleUrl: './ajout-piece.component.css'
})
export class AjoutPieceComponent {
  dataVoiture:any;
  piece:any;
  rdvData = {
    rdvId: '',
    idService: '',
    idSousService: '',
    idVoiture: '',
    devis: [] as { idpiece: string, quantite: number | null }[]
  };
  detailPiece:any;
  ngOnInit(): void{
    this.getServiceVoiture();
    this.getPiece();
   
   if (!this.rdvData.devis[0]) {
    this.rdvData.devis[0] = { idpiece: '', quantite: null };
   }
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

  constructor(private renderer: Renderer2,private pieceService:AjoutPieceService,private router:Router){}

  getServiceVoiture():void{
    let rdvId: string | null = sessionStorage.getItem("rdv");
    let idVoiture:string | null=sessionStorage.getItem("voiture");
    if (rdvId && idVoiture) {
      this.pieceService.getServiceDataRdv(idVoiture, rdvId).subscribe(
        (data)=>{
          this.dataVoiture=data;
          //console.log(JSON.stringify(this.dataVoiture,null,2));
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
    } else {
      console.error("rdvId ou idVoiture est null.");
    }
  }
  retour():void{
    this.router.navigate(['/piece']).then(() => {
      window.location.reload(); // Recharge la page après la navigation
    });
  }
  getDetailPiece(idSousService:string):void{
     let rdvId: string | null = sessionStorage.getItem("rdv");
    let idVoiture:string | null=sessionStorage.getItem("voiture");
    if (rdvId && idVoiture) {
      this.pieceService.getPieceSousService(rdvId,idVoiture,idSousService).subscribe(
        (data)=>{
          this.detailPiece=data;
          console.log(JSON.stringify(this.detailPiece,null,2));
        },
        (error)=>{
          console.error('Error fetching data: ',error);
        }
      );
    } else {
      console.error("rdvId ou idVoiture est null.");
    }
  }
  getPiece():void{
    this.pieceService.getAllPiece().subscribe(
      (data)=>{
        this.piece=data;
        //console.log(JSON.stringify(this.piece,null,2));
      },
      (error)=>{
        console.error('Error fetching data: ',error);
      }
    );
  }
  openModal(idService: string, idSousService: string) {
    //console.log(idService);
    this.rdvData.idService = idService;
    this.rdvData.idSousService = idSousService;
   
  }
  envoieData():void{
    const rdv = sessionStorage.getItem("rdv");
    if (rdv) {
      this.rdvData.rdvId = rdv;
      
    } else {
      console.error("rdv non trouvé dans sessionStorage !");
      // Tu peux afficher un message ou bloquer l'envoi
    }
    const voiture=sessionStorage.getItem("voiture")
    if (voiture) {
      this.rdvData.idVoiture=voiture;
    }else{
      console.error("voiture non trouvé dans sessionStorage !");
    }
    //console.log(JSON.stringify(this.rdvData,null,2));
    this.pieceService.submitData(this.rdvData).subscribe(
      {
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
      }
    )
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
