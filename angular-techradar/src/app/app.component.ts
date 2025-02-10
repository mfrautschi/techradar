import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AddTechnologyComponent} from './add-technology/add-technology.component';
import {ListTechnologyComponent} from './list-technology/list-technology.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddTechnologyComponent, ListTechnologyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-techradar';
}
