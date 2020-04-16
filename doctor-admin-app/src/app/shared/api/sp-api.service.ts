import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServiceProvider } from './sp-model';

@Injectable({
  providedIn: 'root'
})
export class SPApiService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(serviceProvider): Observable<ServiceProvider> {
    return this.httpClient.post<ServiceProvider>(this.apiServer + '/service_providers/', JSON.stringify(serviceProvider), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<ServiceProvider> {
    return this.httpClient.get<ServiceProvider>(this.apiServer + '/service_providers/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<ServiceProvider[]> {
    return this.httpClient.get<ServiceProvider[]>(this.apiServer + '/service_providers/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, serviceProvider): Observable<ServiceProvider> {
    return this.httpClient.put<ServiceProvider>(this.apiServer + '/service_providers/' + id, JSON.stringify(serviceProvider), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<ServiceProvider>(this.apiServer + '/service_providers/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
