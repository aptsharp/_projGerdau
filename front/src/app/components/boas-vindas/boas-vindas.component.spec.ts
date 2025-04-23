import { TestBed } from '@angular/core/testing';
import { BoasVindasComponent } from './boas-vindas.component';
import { PrevisaoTempoService } from '../../services/previsao-tempo.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('BoasVindasComponent', () => {
  let component: BoasVindasComponent;
  let previsaoTempoServiceSpy: jasmine.SpyObj<PrevisaoTempoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PrevisaoTempoService', ['obterPrevisao']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, BoasVindasComponent], // Use imports para componentes standalone
      providers: [{ provide: PrevisaoTempoService, useValue: spy }]
    }).compileComponents();

    previsaoTempoServiceSpy = TestBed.inject(PrevisaoTempoService) as jasmine.SpyObj<PrevisaoTempoService>;
    const fixture = TestBed.createComponent(BoasVindasComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data on initialization', () => {
    const mockResponse = {
      current_condition: [
        {
          lang_pt: [{ value: 'Ensolarado' }],
          temp_C: '25'
        }
      ]
    };
    previsaoTempoServiceSpy.obterPrevisao.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(previsaoTempoServiceSpy.obterPrevisao).toHaveBeenCalledWith('São Paulo');
    expect(component.tempo).toBe('Ensolarado');
    expect(component.temperatura).toBe('25');
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading weather data', () => {
    previsaoTempoServiceSpy.obterPrevisao.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(previsaoTempoServiceSpy.obterPrevisao).toHaveBeenCalledWith('São Paulo');
    expect(component.tempo).toBe('Não foi possível carregar');
    expect(component.temperatura).toBe('--');
    expect(component.loading).toBeFalse();
  });

  it('should have default values before initialization', () => {
    expect(component.cidade).toBe('São Paulo');
    expect(component.tempo).toBe('');
    expect(component.temperatura).toBe('');
    expect(component.loading).toBeTrue();
  });
});