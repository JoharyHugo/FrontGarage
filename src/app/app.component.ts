import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontGarage';
  
}
