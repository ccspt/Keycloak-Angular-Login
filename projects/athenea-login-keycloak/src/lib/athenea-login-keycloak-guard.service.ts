import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { AtheneaLoginKeycloakService } from './athenea-login-keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AtheneaLoginKeycloakGuardService {
 
  constructor(public as: AtheneaLoginKeycloakService) { }


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
