import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularLoginService } from '../keycloak-angular-login.service';

@Component({
  selector: 'lib-error-page',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  constructor(
    private as: KeycloakAngularLoginService
  ) { }

  logout() {
    this.as.logout();
  }

}
