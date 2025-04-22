import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FornecedorService } from '../../services/fornecedor.service';
import { CadastroFornecedorComponent } from "../cadastro-fornecedor/cadastro-fornecedor.component";

@Component({
  selector: 'app-lista-fornecedores',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CadastroFornecedorComponent],
  templateUrl: './lista-fornecedores.component.html',
  styleUrl: './lista-fornecedores.component.scss'
})
export class ListaFornecedoresComponent implements OnInit {
  fornecedores: any[] = [];
  filtro: string = '';
  fornecedorEditando: any = null;
  form: any;
  tipoPessoa: 'FISICA' | 'JURIDICA' = 'JURIDICA';

  private fornecedorService = inject(FornecedorService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  get fornecedoresFiltrados() {
    const termo = this.filtro.toLowerCase();
    return this.fornecedores.filter((f) =>
      f.nome?.toLowerCase().includes(termo) || f.cnpjCpf.includes(termo)
    );
  }

  carregarFornecedores() {
    this.fornecedorService.listar().subscribe({
      next: (data) => this.fornecedores = data,
      error: (err) => console.error('❌ Erro ao listar fornecedores:', err)
    });
  }

  deletar(id: string) {
    const confirma = confirm('Tem certeza que deseja excluir este fornecedor?');
    if (confirma) {
      this.fornecedorService.deletar(id).subscribe({
        next: () => {
          alert('🗑️ Fornecedor excluído!');
          this.carregarFornecedores();
        },
        error: (err) => console.error('Erro ao deletar:', err)
      });
    }
  }

  editar(fornecedor: any) {
    this.fornecedorEditando = fornecedor;
    this.tipoPessoa = fornecedor.tipoPessoa;

    this.form = this.fb.group({
      nome: [fornecedor.nome, Validators.required],
      email: [fornecedor.email, [Validators.required, Validators.email]],
      cep: [fornecedor.cep, Validators.required],
      rg: [fornecedor.rg || ''],
      dataNascimento: [fornecedor.dataNascimento || '']
    });

    // Reforça validações se for PF
    if (this.tipoPessoa === 'FISICA') {
      this.form.get('rg')?.setValidators(Validators.required);
      this.form.get('dataNascimento')?.setValidators(Validators.required);
    } else {
      this.form.get('rg')?.clearValidators();
      this.form.get('dataNascimento')?.clearValidators();
    }
    this.form.get('rg')?.updateValueAndValidity();
    this.form.get('dataNascimento')?.updateValueAndValidity();
  }

  cancelarEdicao() {
    this.fornecedorEditando = null;
    this.form = null;
  }

  atualizar() {
    if (!this.fornecedorEditando) return;

    this.fornecedorService.atualizar(this.fornecedorEditando._id, {
      ...this.fornecedorEditando,
      ...this.form.value
    }).subscribe({
      next: () => {
        alert('Fornecedor atualizado com sucesso!');
        this.cancelarEdicao();
        this.carregarFornecedores();
      },
      error: (err) => console.error('Erro ao atualizar:', err)
    });
  }
}
