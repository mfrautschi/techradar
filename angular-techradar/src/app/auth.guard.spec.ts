import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, provideRouter, Router, RouterModule, RouterStateSnapshot} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isLoggedIn: jasmine.createSpy('isLoggedIn')
    };

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceMock},
        provideRouter([])
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true);

    const mockRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockState: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = authGuard.canActivate(mockRoute, mockState);

    expect(result).toBe(true);
  });

  it('should deny access and redirect to login if user is not logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(false);

    const navigateSpy = spyOn(router, 'navigate');

    const mockRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockState: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = authGuard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
