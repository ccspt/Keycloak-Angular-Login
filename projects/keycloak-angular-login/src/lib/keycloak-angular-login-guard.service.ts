import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { KeycloakAngularLoginService } from './keycloak-angular-login.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAngularLoginGuardService {
  
  constructor(public as: KeycloakAngularLoginService) { }


  canActivate(state: RouterStateSnapshot):boolean {
    let url = state.url;

    if (this.as.token) 
    {
      if (url.includes('/login-redirect')) return false;
    }
    else
    {
      if (!url.includes('/login-redirect')) return false;
    }

    return true;
  }
}
