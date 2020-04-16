import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from './doctor-model';

import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(doctor): Observable<Doctor> {
    return this.httpClient.post<Doctor>(this.apiServer + '/doctors/', JSON.stringify(doctor), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Doctor> {
    return this.httpClient.get<Doctor>(this.apiServer + '/doctors/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(this.apiServer + '/doctors/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, doctor): Observable<Doctor> {
    return this.httpClient.put<Doctor>(this.apiServer + '/doctors/' + id, JSON.stringify(doctor), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Doctor>(this.apiServer + '/doctors/' + id, this.httpOptions)
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
