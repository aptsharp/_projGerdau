import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaEmpresasComponent } from "../components/lista-empresas/lista-empresas.component";
import { CommonModule } from '@angular/common';
import { ListaFornecedoresComponent } from '../components/lista-fornecedores/lista-fornecedores.component';
import { BoasVindasComponent } from '../components/boas-vindas/boas-vindas.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, ListaEmpresasComponent, CommonModule, ListaFornecedoresComponent, BoasVindasComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
