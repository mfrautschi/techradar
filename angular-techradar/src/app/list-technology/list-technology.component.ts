import {TechnologyService} from '../technology.service';
import {Technology} from '../Technology';
import {MatCardModule} from '@angular/material/card';
import {Component} from '@angular/core';
import {Status} from '../status';
import {Category} from '../category';

@Component({
  selector: 'app-list-technology',
  imports: [
    MatCardModule
  ],
  templateUrl: './list-technology.component.html',
  standalone: true,
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

  protected readonly Status = Status;
  protected readonly Category = Category;
}
