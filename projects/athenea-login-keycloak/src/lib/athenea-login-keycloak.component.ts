import { Component } from '@angular/core';
import { AtheneaLoginKeycloakService } from './athenea-login-keycloak.service';

@Component({
  selector: 'lib-athenea-login-keycloak',
  templateUrl: './athenea-login-keycloak.component.html',
  styleUrls: ['./athenea-login-keycloak.component.scss'],
})
export class AtheneaLoginKeycloakComponent {

  constructor(
    private as: AtheneaLoginKeycloakService
  ) { }

  login() {
    this.as.login();
  }

}
