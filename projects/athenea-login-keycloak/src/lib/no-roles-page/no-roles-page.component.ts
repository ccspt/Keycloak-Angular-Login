import { Component } from '@angular/core';
import { AtheneaLoginKeycloakService } from '../athenea-login-keycloak.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-no-roles-page',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './no-roles-page.component.html',
  styleUrl: './no-roles-page.component.scss'
})
export class NoRolesPageComponent {

  constructor(
    private as: AtheneaLoginKeycloakService
  ) { }

  logout() {
    this.as.logout();
  }

}
