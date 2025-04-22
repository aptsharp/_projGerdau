import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-validador-cep',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './validador-cep.component.html',
  styleUrl: './validador-cep.component.scss'
})
export class ValidadorCepComponent implements OnChanges {
  @Input() cep: string = '';
  @Output() cepValido = new EventEmitter<any>();
  mensagem: string = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cep'] && this.cep.length === 8) {
      this.validarCep(this.cep);
    }
  }

  validarCep(valor: string) {
    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      this.mensagem = '❌ CEP inválido: deve conter 8 dígitos';
      return;
    }

    this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
      next: (res: any) => {
        if (res.erro) {
          this.mensagem = '❌ CEP não encontrado!';
        } else {
          this.mensagem = `✅ CEP válido: ${res.localidade} - ${res.uf}`;
          this.cepValido.emit(res);
        }
      },
      error: () => {
        this.mensagem = '❌ Erro ao buscar o CEP';
      }
    });
  }
}
