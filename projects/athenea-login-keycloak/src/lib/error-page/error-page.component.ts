import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AtheneaLoginKeycloakService } from '../athenea-login-keycloak.service';

@Component({
  selector: 'lib-error-page',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  constructor(
    private as: AtheneaLoginKeycloakService
  ) { }

  logout() {
    this.as.logout();
  }

}
