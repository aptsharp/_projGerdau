import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://wttr.in';

  constructor(private http: HttpClient) {}

  getPrevisao(cidade: string): Observable<any> {
    const url = `${this.baseUrl}/${cidade}?format=j1`;
    return this.http.get<any>(url);
  }
}
