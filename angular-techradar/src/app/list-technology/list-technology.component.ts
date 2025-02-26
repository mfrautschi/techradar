import {TechnologyService} from '../technology.service';
import {Technology} from '../Technology';
import {MatCardModule} from '@angular/material/card';
import {Component, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader, Sort} from '@angular/material/sort';

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
    MatSort
  ],
  templateUrl: './list-technology.component.html',
  standalone: true,
  styleUrl: './list-technology.component.scss'
})
export class ListTechnologyComponent {
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
  }

  splitTechnologies(techs: Technology[]) {
    console.log('received technologies');

    this.techniques = [];
    this.tools = [];
    this.platforms = [];
    this.languagesAndFrameworks = [];

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

    this.dataSourceTechniques.data = this.techniques;
    this.dataSourceTools.data = this.tools;
    this.dataSourcePlatforms.data = this.platforms;
    this.dataSourceLanguagesAndFrameworks.data = this.languagesAndFrameworks;
  }

  protected readonly Status = Status;
  protected readonly Category = Category;

  @ViewChild('sortTechniques') sortTechniques: MatSort = {} as MatSort;
  @ViewChild('sortTools') sortTools: MatSort = {} as MatSort;
  @ViewChild('sortPlatforms') sortPlatforms: MatSort = {} as MatSort;
  @ViewChild('sortLanguagesAndFrameworks') sortLanguagesAndFrameworks: MatSort = {} as MatSort;

  ngAfterViewInit() {
    this.dataSourceTechniques.sort = this.sortTechniques;
    this.dataSourceTools.sort = this.sortTools;
    this.dataSourcePlatforms.sort = this.sortPlatforms;
    this.dataSourceLanguagesAndFrameworks.sort = this.sortLanguagesAndFrameworks;
  }

  announceSort(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }
}
