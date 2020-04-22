import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SPPackage } from './sp-package-model';

@Injectable({
  providedIn: 'root'
})
export class SPPackageApiService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(SPPackage): Observable<SPPackage> {
    return this.httpClient.post<SPPackage>(this.apiServer + '/sp_package/', JSON.stringify(SPPackage), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<SPPackage> {
    return this.httpClient.get<SPPackage>(this.apiServer + '/sp_package/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<SPPackage[]> {
    return this.httpClient.get<SPPackage[]>(this.apiServer + '/sp_package/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, SPPackage): Observable<SPPackage> {
    return this.httpClient.put<SPPackage>(this.apiServer + '/sp_package/' + id, JSON.stringify(SPPackage), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<SPPackage>(this.apiServer + '/sp_package/' + id, this.httpOptions)
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
