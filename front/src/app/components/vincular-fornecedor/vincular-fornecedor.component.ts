import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vincular-fornecedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './vincular-fornecedor.component.html',
  styleUrl: './vincular-fornecedor.component.scss',
})
export class VincularFornecedorComponent {
  form: FormGroup;
  mensagem: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
  this.form = this.fb.group({
    cnpjEmpresa: ['', Validators.required],
    cnpjCpfFornecedor: ['', Validators.required],
  });
}

  vincular() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:3000/api/empresas/vincular', this.form.value).subscribe({
      next: () => {
        alert('✅ Fornecedor vinculado com sucesso!');
        this.form.reset();
      },
      error: (err) => {
        console.error('Erro ao vincular:', err);
        alert('❌ Erro ao vincular fornecedor');
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.http.post('http://localhost:3000/api/empresas/vincular', this.form.value).subscribe({
        next: () => {
          this.mensagem = '✅ Fornecedor vinculado com sucesso!';
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro ao vincular:', err);
          this.mensagem = '❌ Erro ao vincular fornecedor.';
        }
      });
    }
  }
}
