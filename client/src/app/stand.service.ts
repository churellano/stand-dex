import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { Stand } from './stand';

@Injectable({
  providedIn: 'root'
})
export class StandService {

  private standsUrl = environment.baseUrl + 'stands';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.add(`StandService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getStands(): Observable<Stand[]> {
    return this.http.get<Stand[]>(this.standsUrl)
      .pipe(
        map(data => data['value']),
        tap(_ => this.log('Fetching all stands')),
        catchError(this.handleError<Stand[]>('getStands', []))
      );
  }

  getStand(id: number): Observable<Stand> {
    this.log(`StandService: fetching stand with id=${id}`);

    const url = `${this.standsUrl}/${id}`;
    return this.http.get<Stand>(url)
      .pipe(
        tap(_ => this.log(`Fetching stand with id=${id}`)),
        catchError(this.handleError<Stand>(`getStand id=${id}`))
      );
  }

  updateStand(stand: Stand): Observable<Stand> {
    const url = `${this.standsUrl}/${stand.Id}`;
    return this.http.put<Stand>(url, stand, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated stand with id=${stand.Id}`)),
        catchError(this.handleError<any>('updateStand'))
      );
  }

  addStand(stand: Stand): Observable<Stand> {
    // console.log(stand);
    return this.http.post<Stand>(this.standsUrl, stand, this.httpOptions)
      .pipe(
        tap((newStand: Stand) => this.log(`Added stand with id=${newStand.Id}`)),
        catchError(this.handleError<Stand>(`addStand`))
      );
  }

  deleteStand(stand: Stand | number): Observable<HttpResponse<any>> {
    const id = typeof stand === 'number' ? stand : stand.Id;
    const url = `${this.standsUrl}/${id}`;

    return this.http.delete<HttpResponse<any>>(url, {observe: 'response'})
      .pipe(
        tap(_ => this.log(`Deleted stand with id=${id}`)),
        catchError(this.handleError<HttpResponse<any>>('deleteStand'))
      );
  }

  searchStands(term: string): Observable<Stand[]> {
    if (term == null) {
      return of([]);
    }
    term = term.trim();
    return this.http.get<Stand[]>(`${this.standsUrl}/?name=${term}`)
      .pipe(
        map(data => {
          return data['value'].filter((stand: Stand) => stand.Name.toLowerCase().includes(term.toLowerCase()));
        }),
        tap(data => data.length ?
        this.log(`Found stands matching "${term}"`) :
        this.log(`No stands matching "${term}"`)
      ),
        catchError(this.handleError<Stand[]>('searchStands', []))
    );
  }

}
