import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FornecedorService } from './fornecedor.service';

describe('FornecedorService', () => {
  let service: FornecedorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FornecedorService]
    });
    service = TestBed.inject(FornecedorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call criar and return the created fornecedor', () => {
    const mockFornecedor = { nome: 'Fornecedor Teste' };
    service.criar(mockFornecedor).subscribe((response) => {
      expect(response).toEqual(mockFornecedor);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockFornecedor);
  });

  it('should call listar and return a list of fornecedores', () => {
    const mockFornecedores = [{ nome: 'Fornecedor 1' }, { nome: 'Fornecedor 2' }];
    service.listar().subscribe((response) => {
      expect(response).toEqual(mockFornecedores);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockFornecedores);
  });

  it('should call buscarPorId and return the fornecedor', () => {
    const mockFornecedor = { id: '1', nome: 'Fornecedor Teste' };
    service.buscarPorId('1').subscribe((response) => {
      expect(response).toEqual(mockFornecedor);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFornecedor);
  });

  it('should call atualizar and return the updated fornecedor', () => {
    const mockFornecedor = { id: '1', nome: 'Fornecedor Atualizado' };
    service.atualizar('1', mockFornecedor).subscribe((response) => {
      expect(response).toEqual(mockFornecedor);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockFornecedor);
  });

  it('should call deletar and return a success message', () => {
    service.deletar('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/fornecedores/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});