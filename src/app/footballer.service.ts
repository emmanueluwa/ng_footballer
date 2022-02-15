import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Footballer } from './footballer';
import { FOOTBALLERS } from './mock-footballers';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FootballerService {
  //url to the web api for requesting data
  private footballersUrl = 'api/footballers';

  //the web api will expect a special header in the HTTP save requests
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  //injext singleton message service into this property on creation
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
  
  //from server, 
  getFootballers(): Observable<Footballer[]> {
    //extending result w pipe method to catch errors
    // return observable of footballer arrays
    return this.http.get<Footballer[]>(this.footballersUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Footballer[]>('getFootballers',[]))
      );
  }

   //404 if the id is not found 
  getFootballer(id: number): Observable<Footballer> {
    //request url w desired ballers id
    const url = `${this.footballersUrl}/${id}`;
    //return an observable of baller objects
    return this.http.get<Footballer>(url).pipe(
      tap(_ => this.log(`fetched footballer id=${id}`)),
      catchError(this.handleError<Footballer>(`getFootballerid=${id}`))
    );
  }

  // http method, PUT
  updateFootballer(footballer: Footballer): Observable<any> 
  {
    return this.http.put(this.footballersUrl, footballer, this.httpOptions).pipe(
      tap(_ => this.log(`updated footballer id=${footballer.id}`)),
      catchError(this.handleError<any>('updateFootballer'))
    )
  }

  // POST
  addFootballer(footballer: Footballer): Observable<Footballer> {
    //server is expected tp generate an id for new baller
    return this.http.post<Footballer>(
      this.footballersUrl, footballer, this.httpOptions
    ).pipe(tap((newFootballer: Footballer) => this.log(
      `added hero w/ id=${newFootballer.id}`
    )),
    catchError(this.handleError<Footballer>('addFootballer'))
    );
  }

  deleteFootballer(id: number): Observable<Footballer> 
  {
    const url = `${this.footballersUrl}/${id}`;

    return this.http.delete<Footballer>(
      url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted footballer id=${id}`)),
        catchError(this.handleError<Footballer>('deleteFootballer'))
      );
  }

  //using search bar to find ballers
  searchFootballers(term: string): Observable<Footballer[]>
  {
    if (!term.trim()) {
      //if not a term then return empty array
      return of([]);
    }
    //url includes query string with search term
    return this.http.get<Footballer[]>(`${this.footballersUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`found footballers matching "${term}"`) : this.log(`no footballers matching "${term}"`)),
      catchError(this.handleError<Footballer[]>('searchFootballers', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?:T)
  {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      //return empty result so app keeps running
      return of(result as T);
    }
  }

  //logging footballerService message w message Service
  private log(message: string) {
    this.messageService.add(`FootballerService: ${message}`);
  }
}

