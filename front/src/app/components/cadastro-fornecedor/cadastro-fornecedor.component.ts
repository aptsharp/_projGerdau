import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FornecedorService } from '../../services/fornecedor.service';
import { ValidadorCepComponent } from '../validador-cep/validador-cep.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltroFornecedorPipe } from '../../pipes/filtro-fornecedor.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ValidadorCepComponent,
    FiltroFornecedorPipe
  ],
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.scss']
})
export class CadastroFornecedorComponent {
  form: any;
  fornecedores: any[] = [];
  filtro: string = '';
  cepValido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService
  ) {
    this.form = this.fb.group({
      cnpjCpf: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      rg: [''],
      dataNascimento: [''],
      tipoPessoa: ['']
    });

    this.form.get('cnpjCpf')?.valueChanges.subscribe((valor: string | null) => {
      const numeros = valor?.replace(/\D/g, '') || '';
      const tipo = numeros.length === 11 ? 'FISICA' : 'JURÍDICA';
      this.form.patchValue({ tipoPessoa: tipo });

      const rgCtrl = this.form.get('rg');
      const nascCtrl = this.form.get('dataNascimento');
      if (tipo === 'FISICA') {
        rgCtrl?.setValidators([Validators.required]);
        nascCtrl?.setValidators([Validators.required]);
      } else {
        rgCtrl?.clearValidators();
        nascCtrl?.clearValidators();
      }
      rgCtrl?.updateValueAndValidity();
      nascCtrl?.updateValueAndValidity();
    });

    this.carregarFornecedores();
  }

  validarCepEmTempoReal(): void {
    const cep = this.form.get('cep')?.value?.replace(/\D/g, '');
    this.cepValido = cep?.length === 8;
  }

  onCepValido(dados: any): void {
    this.cepValido = true;
  }

  onSubmit(): void {
    if (this.form.valid && this.cepValido) {
      this.fornecedorService.criar(this.form.value).subscribe({
        next: () => {
          alert('✅ Fornecedor cadastrado com sucesso!');
          this.form.reset();
          this.cepValido = false;
          this.carregarFornecedores();
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar fornecedor:', err);
          alert('Erro ao cadastrar fornecedor.');
        }
      });
    }
  }

  limparFormulario(): void {
    this.form.reset();
    this.cepValido = false;
  }

  carregarFornecedores(): void {
    this.fornecedorService.listar().subscribe({
      next: (res: any[]) => this.fornecedores = res,
      error: (err: any) => console.error('Erro ao listar fornecedores', err)
    });
  }

  editarFornecedor(fornecedor: any): void {
    this.form.patchValue(fornecedor);
    this.cepValido = true;
  }

  excluirFornecedor(id: string): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.fornecedorService.deletar(id).subscribe({
        next: () => {
          alert('✅ Fornecedor excluído com sucesso!');
          this.carregarFornecedores();
        },
        error: (err: any) => {
          console.error('Erro ao excluir fornecedor:', err);
          alert('Erro ao excluir fornecedor.');
        }
      });
    }
  }
}
