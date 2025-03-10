import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-client',
  imports: [NavComponent, SearchComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

}
