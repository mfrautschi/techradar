import {TechnologyService} from '../technology.service';
import {Technology} from '../Technology';
import {MatCardModule} from '@angular/material/card';
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Status} from '../status';
import {Category} from '../category';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-list-technology',
  imports: [
    MatCardModule,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatSortHeader,
    MatSort,
    NgClass
  ],
  templateUrl: './list-technology.component.html',
  standalone: true,
  styleUrl: './list-technology.component.scss'
})
export class ListTechnologyComponent {
  @Input() mode: string = 'view';
  @Output() technologyAdded = new EventEmitter<Technology>();

  selectTechnology(technology: Technology) {
    if (technology) {
      this.technologyAdded.emit(technology);
    }
  }

  displayedColumns: string[] = ['id', 'name', 'category', 'ring', 'techDescription', 'classDescription', 'status', 'creationDate', 'publicationDate'];
  techniques: Technology[] = [];
  tools: Technology[] = [];
  platforms: Technology[] = [];
  languagesAndFrameworks: Technology[] = [];

  dataSourceTechniques = new MatTableDataSource(this.techniques);
  dataSourceTools = new MatTableDataSource(this.tools);
  dataSourcePlatforms = new MatTableDataSource(this.platforms);
  dataSourceLanguagesAndFrameworks = new MatTableDataSource(this.languagesAndFrameworks);

  constructor(private readonly technologyService: TechnologyService) {
  }

  ngOnInit() {
    this.technologyService.getTechnologies().subscribe((techs: Technology[]) => {
      this.splitTechnologies(techs);
    });
    this.technologyService.fetchTechnologies();
    console.log('# mode ' + this.mode);
  }

  splitTechnologies(techs: Technology[]) {
    this.techniques = [];
    this.tools = [];
    this.platforms = [];
    this.languagesAndFrameworks = [];

    if (this.mode === 'view') {
      techs.filter(t => t.status === Status.Published).forEach(tech => {
        switch (tech.category) {
          case Category.Techniques:
            this.techniques.push(tech);
            break;
          case Category.Tools:
            this.tools.push(tech);
            break;
          case Category.Platforms:
            this.platforms.push(tech);
            break;
          case Category.LanguagesAndFrameworks:
            this.languagesAndFrameworks.push(tech);
            break;
        }
      });
    } else {
      techs.forEach(tech => {
        switch (tech.category) {
          case Category.Techniques:
            this.techniques.push(tech);
            break;
          case Category.Tools:
            this.tools.push(tech);
            break;
          case Category.Platforms:
            this.platforms.push(tech);
            break;
          case Category.LanguagesAndFrameworks:
            this.languagesAndFrameworks.push(tech);
            break;
        }
      });
    }

    this.dataSourceTechniques.data = this.techniques;
    this.dataSourceTools.data = this.tools;
    this.dataSourcePlatforms.data = this.platforms;
    this.dataSourceLanguagesAndFrameworks.data = this.languagesAndFrameworks;
  }

  @ViewChild('sortTechniques') sortTechniques: MatSort = {} as MatSort;
  @ViewChild('sortTools') sortTools: MatSort = {} as MatSort;
  @ViewChild('sortPlatforms') sortPlatforms: MatSort = {} as MatSort;
  @ViewChild('sortLanguagesAndFrameworks') sortLanguagesAndFrameworks: MatSort = {} as MatSort;

  ngAfterViewInit() {
    this.dataSourceTechniques.sort = this.sortTechniques;
    this.dataSourceTechniques.sortingDataAccessor = (item, property) => {
      if (property === 'ring') {
        return ringOrder[item.ring] || 999;
      }
      // @ts-ignore
      return item[property];
    };
    this.dataSourceTechniques.sort.active = 'ring';
    this.dataSourceTechniques.sort.direction = 'asc';

    this.dataSourceTools.sort = this.sortTools;
    this.dataSourceTools.sortingDataAccessor = this.dataSourceTechniques.sortingDataAccessor;
    this.dataSourceTools.sort.active = 'ring';
    this.dataSourceTools.sort.direction = 'asc';

    this.dataSourcePlatforms.sort = this.sortPlatforms;
    this.dataSourcePlatforms.sortingDataAccessor = this.dataSourceTechniques.sortingDataAccessor;
    this.dataSourcePlatforms.sort.active = 'ring';
    this.dataSourcePlatforms.sort.direction = 'asc';

    this.dataSourceLanguagesAndFrameworks.sort = this.sortLanguagesAndFrameworks;
    this.dataSourceLanguagesAndFrameworks.sortingDataAccessor = this.dataSourceTechniques.sortingDataAccessor;
    this.dataSourceLanguagesAndFrameworks.sort.active = 'ring';
    this.dataSourceLanguagesAndFrameworks.sort.direction = 'asc';
  }

  isAdministrationMode() {
    return this.mode === 'admin';
  }
}

const ringOrder: { [key: string]: number } = {
  'Adopt': 1,
  'Trial': 2,
  'Assess': 3,
  'Hold': 4
};
