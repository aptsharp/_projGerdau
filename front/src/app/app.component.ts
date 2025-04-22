import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaEmpresasComponent } from "./components/lista-empresas/lista-empresas.component";
import { CadastroEmpresaComponent } from './components/cadastro-empresa/cadastro-empresa.component';
import { CadastroFornecedorComponent } from './components/cadastro-fornecedor/cadastro-fornecedor.component';
import { ListaFornecedoresComponent } from './components/lista-fornecedores/lista-fornecedores.component';
import { LayoutComponent } from "./layout/layout.component";
import { BoasVindasComponent } from './components/boas-vindas/boas-vindas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
