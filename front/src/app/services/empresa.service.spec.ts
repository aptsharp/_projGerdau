import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpresaService } from './empresa.service';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/empresas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmpresaService],
    });
    service = TestBed.inject(EmpresaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all empresas', () => {
    const mockEmpresas = [{ id: 1, name: 'Empresa 1' }, { id: 2, name: 'Empresa 2' }];

    service.listar().subscribe((empresas) => {
      expect(empresas).toEqual(mockEmpresas);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmpresas);
  });

  it('should list empresas paginated', () => {
    const mockResponse = { empresas: [{ id: 1, name: 'Empresa 1' }], total: 1 };
    const pagina = 1;
    const limite = 10;

    service.listarPaginado(pagina, limite).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/paginado?pagina=${pagina}&limite=${limite}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new empresa', () => {
    const newEmpresa = { name: 'Empresa Nova' };
    const createdEmpresa = { id: 1, ...newEmpresa };

    service.criar(newEmpresa).subscribe((empresa) => {
      expect(empresa).toEqual(createdEmpresa);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmpresa);
    req.flush(createdEmpresa);
  });

  it('should update an existing empresa', () => {
    const updatedEmpresa = { name: 'Empresa Atualizada' };
    const id = '1';

    service.atualizar(id, updatedEmpresa).subscribe((empresa) => {
      expect(empresa).toEqual(updatedEmpresa);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEmpresa);
    req.flush(updatedEmpresa);
  });

  it('should delete an empresa', () => {
    const id = '1';

    service.deletar(id).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});