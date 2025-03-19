import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { SearchComponent } from "../search/search.component";
import { OnInit,Renderer2 } from '@angular/core';
import { FootersComponent } from "../footers/footers.component";

@Component({
  selector: 'app-rendez-client',
  imports: [NavComponent, SearchComponent, FootersComponent],
  templateUrl: './rendez-client.component.html',
  styleUrl: './rendez-client.component.css'
})
export class RendezClientComponent {
  constructor(private renderer: Renderer2) {}
  
  ngOnInit(): void {
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

  private loadScriptsSequentially(scriptUrls: string[]): void {
    const loadScript = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = this.renderer.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.onload = () => {
          console.log(`Script loaded: ${url}`);
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
