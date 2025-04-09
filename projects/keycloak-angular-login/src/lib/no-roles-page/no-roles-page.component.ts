import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularLoginService } from '../keycloak-angular-login.service';

@Component({
  selector: 'lib-no-roles-page',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './no-roles-page.component.html',
  styleUrl: './no-roles-page.component.scss'
})
export class NoRolesPageComponent {

  constructor(
    private as: KeycloakAngularLoginService
  ) { }

  logout() {
    this.as.logout();
  }
}