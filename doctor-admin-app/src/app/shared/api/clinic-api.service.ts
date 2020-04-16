import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Clinic } from './clinic-model';

@Injectable({
  providedIn: 'root'
})
export class ClinicApiService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(clinic): Observable<Clinic> {
    return this.httpClient.post<Clinic>(this.apiServer + '/clinics/', JSON.stringify(clinic), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Clinic> {
    return this.httpClient.get<Clinic>(this.apiServer + '/clinics/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Clinic[]> {
    return this.httpClient.get<Clinic[]>(this.apiServer + '/clinics/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, clinic): Observable<Clinic> {
    return this.httpClient.put<Clinic>(this.apiServer + '/clinics/' + id, JSON.stringify(clinic), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Clinic>(this.apiServer + '/clinics/' + id, this.httpOptions)
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
