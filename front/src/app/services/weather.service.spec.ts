import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data for a given city', () => {
    const mockResponse = { weather: 'sunny' };
    const city = 'London';

    service.getPrevisao(city).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://wttr.in/${city}?format=j1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors gracefully', () => {
    const city = 'InvalidCity';
    const errorMessage = '404 error';

    service.getPrevisao(city).subscribe(
      () => fail('Expected an error, not weather data'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpMock.expectOne(`https://wttr.in/${city}?format=j1`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});