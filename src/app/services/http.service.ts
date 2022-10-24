import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private http: HttpClient) { }

  Get(caminho: string) {
    return this.http.get<T>(`${environment.apiUrl}${caminho}`).pipe(take(1));
  }

  GetList(caminho: string) {
    return this.http.get<T[]>(`${environment.apiUrl}${caminho}`).pipe(take(1));
  }
}

