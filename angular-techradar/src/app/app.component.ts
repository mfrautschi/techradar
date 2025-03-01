import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ManageTechnologyComponent} from './manage-technology/manage-technology.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ManageTechnologyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-techradar';
}
