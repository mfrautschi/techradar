import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {catchError, Observable, Subject} from 'rxjs';
import {Technology} from './Technology';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  //private readonly url = 'https://67a1da79409de5ed52534a89.mockapi.io/api/v1/technologies';
  private readonly url = 'http://localhost:3000/api/v1/technologies';
  private readonly technologiesSubject = new Subject<Technology[]>();

  constructor(private readonly httpClient: HttpClient) {
  }

  getTechnologiesREST(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.url)
      .pipe(catchError((error) => {
        console.error('Error fetching technologies', error);
        throw error;
      }));
  }

  fetchTechnologies() {
    this.getTechnologiesREST().subscribe((techs) => {
      this.technologiesSubject.next(techs);
    })
  }

  getTechnologies(): Observable<Technology[]> {
    return this.technologiesSubject.asObservable();
  }

  async addTechnology(techForm: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    category: FormControl<string | null>;
    ring: FormControl<string | null>;
    techDescription: FormControl<string | null>;
    classDescription: FormControl<string | null>;
    status: FormControl<string | null>;
    creationDate: FormControl<string | null>;
    publicationDate: FormControl<string | null>
  }>): Promise<Technology> {
    const r = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(techForm.getRawValue())
    });
    return await r.json();
  }

  async updateTechnology(techForm: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    category: FormControl<string | null>;
    ring: FormControl<string | null>;
    techDescription: FormControl<string | null>;
    classDescription: FormControl<string | null>;
    status: FormControl<string | null>;
    creationDate: FormControl<string | null>;
    publicationDate: FormControl<string | null>
  }>) {
    const technologyId = techForm.getRawValue().id;
    try {
      const response = await fetch(`${this.url}/${technologyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(techForm.getRawValue())
      });
      if (!response.ok) {
        throw new Error('Failed to update technology');
      }
      this.fetchTechnologies();
      console.log(response.text);
    } catch (error) {
      console.error(`Error deleting technology ${technologyId}`, error);
    }
  }

  async deleteTechnology(techForm: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    category: FormControl<string | null>;
    ring: FormControl<string | null>;
    techDescription: FormControl<string | null>;
    classDescription: FormControl<string | null>;
    status: FormControl<string | null>;
    creationDate: FormControl<string | null>;
    publicationDate: FormControl<string | null>
  }>) {
    const technologyId = techForm.getRawValue().id;
    console.log('uri delete', `${this.url}/${technologyId}`);
    try {
      const response = await fetch(`${this.url}/${technologyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete technology');
      }
      this.fetchTechnologies();
      console.log(response.text);
    } catch (error) {
      console.error(`Error deleting technology ${technologyId}`, error);
    }
  }
}
