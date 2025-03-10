import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {catchError, Observable, Subject} from 'rxjs';
import {Technology} from './Technology';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private readonly url = 'http://localhost:3000/api/v1/technologies';
  private readonly technologiesSubject = new Subject<Technology[]>();

  constructor(private readonly httpClient: HttpClient) {
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getTechnologiesREST(): Observable<Technology[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.httpClient.get<Technology[]>(this.url, {headers})
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify(techForm.getRawValue())
      });
      if (!response.ok) {
        throw new Error('Failed to update technology');
      }
      this.fetchTechnologies();
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
    try {
      const response = await fetch(`${this.url}/${technologyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete technology');
      }
      this.fetchTechnologies();
    } catch (error) {
      console.error(`Error deleting technology ${technologyId}`, error);
    }
  }
}
