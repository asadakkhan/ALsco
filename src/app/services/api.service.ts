import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../core/app.config';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }


  get<T>(url: string, params?: object, jsonResponse: boolean = true): Observable<any> {
    let options: any = this.getOptions(jsonResponse);

    if (params) {
      options['params'] = this.getHttpParams(params);
    }

    return this.http.get<T>(this.getFullUrl(url), options);
  }

  post<T>(url: string, body?: any, postAction: boolean = true, jsonResponse: boolean = true): Observable<any> {
    let options = this.getOptions(jsonResponse);
    if (postAction) {

    }
    return this.http.post<T>(this.getFullUrl(url), body, options)
      .pipe(map((response) => {
        if (postAction) { }
        return response;
      }),
        catchError(err => {
          return throwError(() => err);
        }));
  }


  put<T>(url: string, body?: object, postAction: boolean = true, jsonResponse: boolean = true): Observable<any> {
    let options = this.getOptions(jsonResponse);
    if (postAction) {
    }
    return this.http.put<T>(this.getFullUrl(url), body, options)
      .pipe(map(response => {
        if (postAction) {
        }
        return response;
      }),
        catchError(err => {

          return throwError(() => err);
        }));
  }

  delete<T>(url: string, jsonResponse: boolean = true): Observable<any> {
    let options = this.getOptions(jsonResponse);
    return this.http.delete<T>(this.getFullUrl(url), options)
      .pipe(map(response => {
        return response;
      }),
        catchError(err => {
          return throwError(() => err);
        }));
  }

  fileUpload<T>(url: string, body?: any) {
    const req = new HttpRequest('POST', `${this.getFullUrl(url)}`, body, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  private getFullUrl(url: string): string {
    return this.appConfig.config.apiRoot + url;
  }

  private getHttpParams(params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }

  private getOptions(jsonResponse: boolean) {
    let options: any = {};

    if (!jsonResponse) {
      options['responseType'] = 'text';
    }

    return options;
  }

}
