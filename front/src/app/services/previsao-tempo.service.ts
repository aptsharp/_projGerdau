import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrevisaoTempoService {
  private http = inject(HttpClient);

  obterPrevisao(cidade: string): Observable<any> {
    const url = `https://wttr.in/${cidade}?format=j1`;
    return this.http.get<any>(url);
  }
}
