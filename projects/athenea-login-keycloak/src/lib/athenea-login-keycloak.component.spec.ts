import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtheneaLoginKeycloakComponent } from './athenea-login-keycloak.component';

describe('AtheneaLoginKeycloakComponent', () => {
  let component: AtheneaLoginKeycloakComponent;
  let fixture: ComponentFixture<AtheneaLoginKeycloakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtheneaLoginKeycloakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtheneaLoginKeycloakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
