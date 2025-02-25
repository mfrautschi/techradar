import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {TECHNOLOGIES} from './mock-technologies';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private readonly url = 'https://67a1da79409de5ed52534a89.mockapi.io/api/v1/technologies';

  constructor() {
  }

  getTechnologies() {
    return of(TECHNOLOGIES);
  }

  async getTechnologiesREST() {
    const response = await fetch(this.url);
    return response.json();
  }

  addTechnology(techForm: FormGroup<{
    name: FormControl<string | null>;
    category: FormControl<string | null>;
    ring: FormControl<string | null>;
    techDescription: FormControl<string | null>;
    classDescription: FormControl<string | null>;
    status: FormControl<string | null>;
    creationDate: FormControl<string | null>;
    publicationDate: FormControl<string | null>;
  }>) {

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(techForm.getRawValue())
    }).then(r => r.json()).then(r => console.log(r));
  }
}
