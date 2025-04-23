import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpresasComponent } from './lista-empresas.component';
import { of as observableOf } from 'rxjs';

describe('ListaEmpresasComponent', () => {
  let component: ListaEmpresasComponent;
  let fixture: ComponentFixture<ListaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load companies on initialization', () => {
    const spy = spyOn(component, 'carregarEmpresas');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call carregarEmpresas when proximaPagina is invoked and there are more pages', () => {
    component.paginaAtual = 1;
    component.limite = 5;
    component.total = 15; // 3 pages
    const spy = spyOn(component, 'carregarEmpresas');
    component.proximaPagina();
    expect(component.paginaAtual).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should not change paginaAtual when proximaPagina is invoked and there are no more pages', () => {
    component.paginaAtual = 3;
    component.limite = 5;
    component.total = 15; // 3 pages
    const spy = spyOn(component, 'carregarEmpresas');
    component.proximaPagina();
    expect(component.paginaAtual).toBe(3);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call carregarEmpresas when paginaAnterior is invoked and paginaAtual > 1', () => {
    component.paginaAtual = 2;
    const spy = spyOn(component, 'carregarEmpresas');
    component.paginaAnterior();
    expect(component.paginaAtual).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should not change paginaAtual when paginaAnterior is invoked and paginaAtual is 1', () => {
    component.paginaAtual = 1;
    const spy = spyOn(component, 'carregarEmpresas');
    component.paginaAnterior();
    expect(component.paginaAtual).toBe(1);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call empresaService.deletar and carregarEmpresas when deletar is confirmed', () => {
    const id = '123';
    spyOn(window, 'confirm').and.returnValue(true);
    const deletarSpy = spyOn(component['empresaService'], 'deletar').and.returnValue(observableOf({}));
    const carregarSpy = spyOn(component, 'carregarEmpresas');
    component.deletar(id);
    expect(deletarSpy).toHaveBeenCalledWith(id);
    expect(carregarSpy).toHaveBeenCalled();
  });

  it('should not call empresaService.deletar when deletar is canceled', () => {
    const id = '123';
    spyOn(window, 'confirm').and.returnValue(false);
    const deletarSpy = spyOn(component['empresaService'], 'deletar');
    component.deletar(id);
    expect(deletarSpy).not.toHaveBeenCalled();
  });

  it('should set empresaEditando when editar is called', () => {
    const empresa = { _id: '123', nome: 'Empresa Teste' };
    component.editar(empresa);
    expect(component.empresaEditando).toEqual(empresa);
  });

  it('should reset empresaEditando when cancelarEdicao is called', () => {
    component.empresaEditando = { _id: '123', nome: 'Empresa Teste' };
    component.cancelarEdicao();
    expect(component.empresaEditando).toBeNull();
  });

  it('should call empresaService.atualizar and carregarEmpresas when atualizar is called', () => {
    component.empresaEditando = { _id: '123', nome: 'Empresa Atualizada' };
    const atualizarSpy = spyOn(component['empresaService'], 'atualizar').and.returnValue(observableOf({}));
    const carregarSpy = spyOn(component, 'carregarEmpresas');
    component.atualizar();
    expect(atualizarSpy).toHaveBeenCalledWith('123', { _id: '123', nome: 'Empresa Atualizada' });
    expect(carregarSpy).toHaveBeenCalled();
    expect(component.empresaEditando).toBeNull();
  });
});
function of(arg0: {}): import("rxjs").Observable<any> {
  throw new Error('Function not implemented.');
}

