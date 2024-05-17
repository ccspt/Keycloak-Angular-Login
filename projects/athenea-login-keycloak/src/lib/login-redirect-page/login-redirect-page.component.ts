import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginRedirectComponent } from '../login-redirect/login-redirect.component';

@Component({
  selector: 'lib-login-redirect-page',
  standalone: true,
  imports: [IonicModule, LoginRedirectComponent],
  templateUrl: './login-redirect-page.component.html',
  styleUrl: './login-redirect-page.component.scss'
})
export class LoginRedirectPageComponent {

}
