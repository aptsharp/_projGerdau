import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'filtroFornecedor',
  standalone: true,
  pure: false
})
export class FiltroFornecedorPipe implements PipeTransform {
  transform(fornecedores: any[], filtro: string): any[] {
    if (!filtro) return fornecedores;
    filtro = filtro.toLowerCase();
    return fornecedores.filter(f =>
      f.nome?.toLowerCase().includes(filtro) || f.cnpjCpf?.includes(filtro)
    );
  }
}
