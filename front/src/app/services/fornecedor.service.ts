import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = 'http://localhost:3000/api/fornecedores';

  constructor(private http: HttpClient) {}

  criar(fornecedor: any): Observable<any> {
    return this.http.post(this.apiUrl, fornecedor);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  atualizar(id: string, fornecedor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fornecedor);
  }

  deletar(id: string) {
    return this.http.delete(`${this.apiUrl}/fornecedores/${id}`);
  }


}
