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

  addTechnology(techForm: FormGroup<{
    name: FormControl<string | null>;
    category: FormControl<string | null>;
    ring: FormControl<string | null>;
    techDescription: FormControl<string | null>;
    classDescription: FormControl<string | null>;
    status: FormControl<string | null>;
    creationDate: FormControl<string | null>;
    publicationDate: FormControl<string | null>;
  }>) : Promise<Technology> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(techForm.getRawValue())
    }).then(r => r.json());
  }
}
