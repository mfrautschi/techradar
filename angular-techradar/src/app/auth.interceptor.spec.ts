import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import {AuthInterceptor} from './auth.interceptor';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // You don't need HttpClientTestingModule anymore
      providers: [
        HttpClient,
        {provide: HTTP_INTERCEPTORS, useValue: AuthInterceptor, multi: true},
      ]
    });

    // Inject HttpClient and HttpTestingController
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(AuthInterceptor).toBeTruthy();
  });

  it('should intercept HTTP requests and add an Authorization header', () => {
    // Example test for an API request
    const testUrl = '/test-url';
    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(testUrl);

    // Check that the request has the Authorization header
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush({}); // Simulate response with empty body
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure there are no pending requests
  });
});
