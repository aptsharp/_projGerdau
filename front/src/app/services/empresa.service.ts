import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/empresas';

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listarPaginado(pagina: number, limite: number): Observable<{ empresas: any[], total: number }> {
    const params = `?pagina=${pagina}&limite=${limite}`;
    return this.http.get<{ empresas: any[], total: number }>(`${this.apiUrl}/paginado${params}`);
  }

  criar(empresa: any): Observable<any> {
    return this.http.post(this.apiUrl, empresa);
  }

  atualizar(id: string, empresa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empresa);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
