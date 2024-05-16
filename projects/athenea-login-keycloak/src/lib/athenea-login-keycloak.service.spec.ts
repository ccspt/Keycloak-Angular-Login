import { TestBed } from '@angular/core/testing';

import { AtheneaLoginKeycloakService } from './athenea-login-keycloak.service';

describe('AtheneaLoginKeycloakService', () => {
  let service: AtheneaLoginKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtheneaLoginKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
