import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {TECHNOLOGIES} from './mock-technologies';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private readonly url = 'https://67a1da79409de5ed52534a89.mockapi.io/api/v1/technologies';

  constructor() {
  }

  getTechnologies() {
    return  of(TECHNOLOGIES);
  }

  async getTechnologiesREST(){
    const response = await fetch(this.url);
    return response.json();
  }
}
