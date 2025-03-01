import { Component } from '@angular/core';
import {AddTechnologyComponent} from '../add-technology/add-technology.component';
import {ListTechnologyComponent} from '../list-technology/list-technology.component';
import {Technology} from '../Technology';

@Component({
  selector: 'app-manage-technology',
  imports: [
    AddTechnologyComponent,
    ListTechnologyComponent
  ],
  templateUrl: './manage-technology.component.html',
  styleUrl: './manage-technology.component.scss'
})
export class ManageTechnologyComponent {
  listMode: string = 'administration';
  selectedTechnology: Technology | null = null;

  onTechnologySelected(technology: Technology){
    this.selectedTechnology = technology;
    console.log('Parent received technology: ', technology);
  }
}
