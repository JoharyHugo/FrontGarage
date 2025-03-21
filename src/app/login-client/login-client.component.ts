import { Component,Renderer2 } from '@angular/core';
import { LoginclientService } from './loginclient.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  imports:[FormsModule],
  styleUrl: './login-client.component.css'
})
export class LoginClientComponent {
  data = { email: '', motdepasse: '' };
  
  constructor(
    private loginClientService:LoginclientService,private renderer: Renderer2,private router:Router
  ){}

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log("Utilisateur déjà connecté, redirection...");
      this.router.navigate(['/client']);
      return; // Stoppe l'exécution pour éviter le chargement inutile des scripts
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

  

  loginUser():any{
    this.loginClientService.login(this.data).subscribe({
      next:(response)=>{
        //console.log("Réponse du serveur :", response);
        sessionStorage.setItem("token",response.token);
        //console.log("Redirection en cours...");
        this.router.navigate(['/client']).then(() => {
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
