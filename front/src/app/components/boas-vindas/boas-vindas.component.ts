import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrevisaoTempoService } from '../../services/previsao-tempo.service';

@Component({
  selector: 'app-boas-vindas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boas-vindas.component.html',
  styleUrl: './boas-vindas.component.scss'
})
export class BoasVindasComponent implements OnInit {
  clima: any;
  erro: boolean = false;

  private previsaoService = inject(PrevisaoTempoService);

  cidade = 'São Paulo';
  tempo = '';
  temperatura = '';
  loading = true;

  ngOnInit(): void {
    this.previsaoService.obterPrevisao(this.cidade).subscribe({
      next: (res) => {
        const condicao = res.current_condition?.[0];
        this.tempo = condicao.lang_pt?.[0].value || 'N/A';
        this.temperatura = condicao.temp_C;
        this.loading = false;
      },
      error: () => {
        this.tempo = 'Não foi possível carregar';
        this.temperatura = '--';
        this.loading = false;
      }
    });
  }
}
