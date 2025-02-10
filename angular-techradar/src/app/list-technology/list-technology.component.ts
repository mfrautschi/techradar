import {TechnologyService} from '../technology.service';
import {Technology} from '../Technology';
import {MatCardModule} from '@angular/material/card';
import {Component} from '@angular/core';

@Component({
  selector: 'app-list-technology',
  imports: [
    MatCardModule
  ],
  templateUrl: './list-technology.component.html',
  styleUrl: './list-technology.component.scss'
})
export class ListTechnologyComponent {
  technologies: Technology[] = [];

  constructor(private readonly technologyService: TechnologyService) {
  }

  ngOnInit() {
    this.getTechnologyREST();
  }

  getTechnologies() {
    this.technologyService.getTechnologies().subscribe(techs => this.technologies = techs);
  }

  async getTechnologyREST(){
    this.technologies = await this.technologyService.getTechnologiesREST();
  }
}
