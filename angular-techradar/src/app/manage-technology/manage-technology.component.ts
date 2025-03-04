import {Component, OnInit} from '@angular/core';
import {AddTechnologyComponent} from '../add-technology/add-technology.component';
import {ListTechnologyComponent} from '../list-technology/list-technology.component';
import {Technology} from '../Technology';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-manage-technology',
  imports: [
    AddTechnologyComponent,
    ListTechnologyComponent
  ],
  templateUrl: './manage-technology.component.html',
  standalone: true,
  styleUrl: './manage-technology.component.scss'
})
export class ManageTechnologyComponent implements OnInit {
  listMode: string = 'administration';
  selectedTechnology: Technology | null = null;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAdministrator()) {
      this.listMode = 'administration';
    } else {
      this.listMode = 'view';
    }
  }

  onTechnologySelected(technology: Technology) {
    this.selectedTechnology = technology;
  }
}
