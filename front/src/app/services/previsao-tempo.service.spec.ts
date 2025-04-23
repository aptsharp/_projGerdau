import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrevisaoTempoService } from './previsao-tempo.service';

describe('PrevisaoTempoService', () => {
  let service: PrevisaoTempoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrevisaoTempoService],
    });
    service = TestBed.inject(PrevisaoTempoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather forecast for a given city', () => {
    const mockResponse = { current_condition: [{ temp_C: '25' }] };
    const city = 'London';

    service.obterPrevisao(city).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://wttr.in/${city}?format=j1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors gracefully', () => {
    const city = 'InvalidCity';
    const errorMessage = '404 Not Found';

    service.obterPrevisao(city).subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne(`https://wttr.in/${city}?format=j1`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
