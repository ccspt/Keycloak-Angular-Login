import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Preferences } from "@capacitor/preferences";

//OAUTH2
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { ConfigService } from '../config.service';

interface UserProfile {
  info?: {
      name?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AtheneaLoginKeycloakService {

  public token: string | null = null;
  public userName: string | null = null;
  public logged: boolean = false;

  constructor(
      private oauthService: OAuthService,
      private configService: ConfigService,
  ) { }

  async setUser(name: string | null) {
      this.userName = name;
      if (!name) return Preferences.remove({ key: 'name_user'});
      Preferences.set({ key: 'name_user', value: name });
  }
  
  async loadUser() {
      let userName = await Preferences.get({ key: 'name_user' });
      if (userName && userName.value) {
          this.userName = userName.value;
      }
  }

  async initOAuth() {
      try {
        /**
         * Inicia config
         */
        const authCodeFlowConfig = this.configService.getConfig();
        if (!authCodeFlowConfig) {
        throw new Error('Configuration not loaded');
        }
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        /**
         * Carrega i gestiona automaticament el refresh de la sessió
         * loadDiscoveryDocumentAndTryLogin() -> Inicia i has de fer tu login manualment amb
         *    this.oauthService.initImplicitFlow();
         * loadDiscoveryDocumentAndLogin() -> Inicia i gestiona automaticament login en cas de no estar identificat
         */
        this.oauthService.setupAutomaticSilentRefresh();
        // await this.oauthService.loadDiscoveryDocumentAndTryLogin();
        await this.oauthService.loadDiscoveryDocumentAndLogin();

        this.token = this.oauthService.getAccessToken();
        const tokenDecoded: UserProfile | undefined = await this.oauthService.loadUserProfile();
        const userName = tokenDecoded?.info?.name;
        if (userName) {
            this.setUser(userName);
        } else {
            this.setUser(null);
        }
        this.logged = this.token ? true : false;
        if (this.logged) 
            return userName;
        else
            return null;
      } catch (error) {
        this.token = null;
        return null;
      }
  }

  login() {
      this.oauthService.initImplicitFlow();
  }
  
  logout() {
      this.oauthService.logOut();
  }
}
