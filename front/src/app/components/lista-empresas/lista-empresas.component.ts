import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { CadastroEmpresaComponent } from '../cadastro-empresa/cadastro-empresa.component';


@Component({
  selector: 'app-lista-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule, CadastroEmpresaComponent],
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.scss'
})
export class ListaEmpresasComponent implements OnInit {
  empresas: any[] = [];
  empresaEditando: any = null;

  paginaAtual: number = 1;
  limite: number = 5;
  total: number = 0;

  private empresaService = inject(EmpresaService);

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.empresaService.listarPaginado(this.paginaAtual, this.limite).subscribe({
      next: (res) => {
        this.empresas = res.empresas;
        this.total = res.total;
      },
      error: (err) => console.error('Erro ao listar empresas:', err)
    });
  }

  proximaPagina() {
    if (this.paginaAtual * this.limite < this.total) {
      this.paginaAtual++;
      this.carregarEmpresas();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarEmpresas();
    }
  }

  deletar(id: string) {
    const confirma = confirm('Deseja mesmo excluir esta empresa?');
    if (confirma) {
      this.empresaService.deletar(id).subscribe({
        next: () => {
          alert('Empresa excluída!');
          this.carregarEmpresas();
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  editar(empresa: any) {
    this.empresaEditando = { ...empresa }; // cópia para edição
  }

  cancelarEdicao() {
    this.empresaEditando = null;
  }

  atualizar() {
    this.empresaService.atualizar(this.empresaEditando._id, this.empresaEditando).subscribe({
      next: () => {
        alert('Empresa atualizada!');
        this.empresaEditando = null;
        this.carregarEmpresas();
      },
      error: (err) => console.error('Erro ao atualizar:', err)
    });
  }
}
