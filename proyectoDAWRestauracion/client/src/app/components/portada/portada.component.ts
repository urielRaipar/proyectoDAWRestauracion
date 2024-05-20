import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, RouterModule,Router} from '@angular/router';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {

}
