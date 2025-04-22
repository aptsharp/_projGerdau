import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BoasVindasComponent } from './components/boas-vindas/boas-vindas.component';

export const routes: Routes = [
  // redi rota raiz para tela de bem viindas
  { path: '', redirectTo: 'boas-vindas', pathMatch: 'full' },

  // Estrutura principal com menu/layout lateral
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'boas-vindas', component: BoasVindasComponent },

      // Lazy loading para componentes standalone
      {
        path: 'empresas',
        loadComponent: () =>
          import('./components/lista-empresas/lista-empresas.component').then(
            (m) => m.ListaEmpresasComponent
          )
      },
      {
        path: 'fornecedores',
        loadComponent: () =>
          import('./components/lista-fornecedores/lista-fornecedores.component').then(
            (m) => m.ListaFornecedoresComponent
          )
      },
      {
        path: 'vincular',
        loadComponent: () =>
          import('./components/vincular-fornecedor/vincular-fornecedor.component').then(
            (m) => m.VincularFornecedorComponent
          )
      }
    ]
  },

  // para pag não encontrada
  {
    path: '**',
    redirectTo: 'boas-vindas'
  }
];
