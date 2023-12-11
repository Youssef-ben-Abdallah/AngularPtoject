import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CookieService, Router]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should get user by ID', () => {
    const userId = '123';
    const mockUser: User = {
      email: '',
      password: ''
    };
  
    authService.getUserById(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  
    const req = httpTestingController.expectOne(`${authService.baseurl}/getClientById/${userId}`);
    expect(req.request.method).toEqual('GET');
  
    req.flush(mockUser);
  });

  it('should sign in and set cookies', () => {
    const mockUser = { /* Provide a mock user object for the login */ };

    authService.signIn(mockUser);

    const req = httpTestingController.expectOne(`${authService.baseurl}/login`);
    expect(req.request.method).toEqual('POST');

    req.flush({ token: 'mockToken', id: '123', email: 'test@example.com', role: '1' }); // Adjust based on your response
  });

  
// ...

it('should get user role', () => {
  // Mock the cookie service
  spyOn(authService.cookieService, 'get').and.returnValue('1'); // Assuming the role is '1'

  const userRole = authService.getUserRole();

  expect(userRole).toEqual(1);
});

it('should return null for user role if not set', () => {
  // Mock the cookie service
  spyOn(authService.cookieService, 'get').and.returnValue("");

  const userRole = authService.getUserRole();

  expect(userRole).toBeNull();
});

it('should get token', () => {
  // Mock the local storage
  spyOn(localStorage, 'getItem').and.returnValue('mockToken');

  const token = authService.getToken();

  expect(token).toEqual('mockToken');
});

it('should return null for token if not set', () => {
  // Mock the local storage
  spyOn(localStorage, 'getItem').and.returnValue(null);

  const token = authService.getToken();

  expect(token).toBeNull();
});

it('should return true for isLoggedIn if token is set', () => {
  // Mock the local storage
  spyOn(localStorage, 'getItem').and.returnValue('mockToken');

  const isLoggedIn = authService.isLoggedIn;

  expect(isLoggedIn).toBe(true);
});

it('should return false for isLoggedIn if token is not set', () => {
  // Mock the local storage
  spyOn(localStorage, 'getItem').and.returnValue(null);

  const isLoggedIn = authService.isLoggedIn;

  expect(isLoggedIn).toBe(false);
});

it('should get user ID', () => {
  // Mock the cookie service
  spyOn(authService.cookieService, 'get').and.returnValue('123');

  const userId = authService.getUserId();

  expect(userId).toEqual(123);
});

it('should return null for user ID if not set', () => {
  // Mock the cookie service
  spyOn(authService.cookieService, 'get').and.returnValue("");

  const userId = authService.getUserId();

  expect(userId).toBeNull();
});

it('should do logout', () => {
  // Mock the local storage and cookie service
  spyOn(localStorage, 'removeItem');
  spyOn(authService.cookieService, 'delete');
  spyOn(authService.router, 'navigate');

  authService.doLogout();

  // Add expectations for the logout logic
  // Example: expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
});

// ...

});
