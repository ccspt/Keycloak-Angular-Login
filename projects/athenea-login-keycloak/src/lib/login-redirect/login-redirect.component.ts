import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AtheneaLoginKeycloakService } from '../athenea-login-keycloak.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-login-redirect',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.scss'
})
export class LoginRedirectComponent {

  constructor(
    private as: AtheneaLoginKeycloakService
  ) { }

  login() {
    this.as.login();
  }

}
