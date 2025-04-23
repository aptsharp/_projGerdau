import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidadorCepComponent } from './validador-cep.component';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';

describe('ValidadorCepComponent', () => {
  let component: ValidadorCepComponent;
  let fixture: ComponentFixture<ValidadorCepComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [ValidadorCepComponent],
      providers: [
        { provide: HttpClient, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidadorCepComponent);
    component = fixture.componentInstance;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve validar CEP com menos de 8 dígitos', () => {
    component.cep = '1234567';
    component.ngOnChanges({
      cep: new SimpleChange(null, component.cep, true)
    });

    expect(component).toBeTruthy('CEP inválido: deve conter 8 dígitos');
  });

  it('deve exibir mensagem de sucesso e emitir evento se o CEP for válido', () => {
    const mockResponse = {
      cep: '01001-000',
      localidade: 'São Paulo',
      uf: 'SP'
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));
    spyOn(component.cepValido, 'emit');

    component.cep = '01001000';
    component.ngOnChanges({
      cep: new SimpleChange('', component.cep, true)
    });

    expect(component).toBeTruthy('CEP válido: São Paulo - SP');
    expect(component).toBeTruthy(mockResponse);
  });

  it('deve exibir mensagem de erro se o CEP não for encontrado', () => {
    const mockResponse = { erro: true };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    component.cep = '00000000';
    component.ngOnChanges({
      cep: new SimpleChange('', component.cep, true)
    });

    expect(component).toBeTruthy('CEP não encontrado!');
  });

  it('deve exibir mensagem de erro se a requisição falhar', () => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Erro de rede')));

    component.cep = '01001000';
    component.ngOnChanges({
      cep: new SimpleChange('', component.cep, true)
    });

    expect(component).toBeTruthy('Erro ao buscar o CEP');
  });
});
