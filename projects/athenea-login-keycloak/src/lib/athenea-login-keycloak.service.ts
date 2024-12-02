import { Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences";

//OAUTH2
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { ConfigService } from '../config.service';
import { ProfessionalService } from './professional.service';

interface UserProfile {
  info?: {
      name?: string;
      preferred_username?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AtheneaLoginKeycloakService {

  public token: string | null = null;
  public nameSurname: string | null = null;
  public username: string | null = null;
  public logged: boolean = false;

  constructor(
      private oauthService: OAuthService,
      private configService: ConfigService,
      private professionalService: ProfessionalService,
  ) { }

  async setUser(name: string | null, token: string | null, username: string | null) {
      this.nameSurname = name;
      this.token = token;
      this.username = username;
      if (!name) return Preferences.remove({ key: 'name_user'});
      if (!token) return Preferences.remove({ key: 'token'});
      if (!username) return Preferences.remove({ key: 'username'});
      Preferences.set({ key: 'name_user', value: name });
      Preferences.set({ key: 'token', value: token });
      Preferences.set({ key: 'username', value: username });
  }
  
  async loadUser() {
      let userName = await Preferences.get({ key: 'name_user' });
      let token = await Preferences.get({ key: 'token' });
      let username = await Preferences.get({ key: 'username' });
      if (userName && userName.value && token && token.value && username && username.value) {
          this.nameSurname = userName.value;
          this.token = token.value;
          this.username = username.value;
      }
  }

  async initOAuth(idpHint?: string) {
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
      if (idpHint) {
        this.oauthService.customQueryParams = {
          kc_idp_hint: idpHint,
        };
      }
      /**
       * Carrega i gestiona automaticament el refresh de la sessió
       * loadDiscoveryDocumentAndTryLogin() -> Inicia i has de fer tu login manualment amb
       *    this.oauthService.initImplicitFlow();
       * loadDiscoveryDocumentAndLogin() -> Inicia i gestiona automaticament login en cas de no estar identificat
       */
      this.oauthService.setupAutomaticSilentRefresh();
      // await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      await this.oauthService.loadDiscoveryDocumentAndLogin();

      this.getToken();
      const tokenDecoded: UserProfile | undefined = await this.oauthService.loadUserProfile();
      const userName = tokenDecoded?.info?.name;
      const username = tokenDecoded?.info?.preferred_username;
      if (userName && username) {
          this.setUser(userName, this.token, username);
          await this.professionalService.assignDynamicRoles(this.getToken());
          this.oauthService.refreshToken();
      } else {
          this.setUser(null, null, null);
      }
      this.logged = this.token ? true : false;
      if (this.logged) 
          return userName;
      else
          return null;
    } catch (error) {
      this.token = null;
      throw error;
    }
  }

  login() {
    this.oauthService.initImplicitFlow();
  }
  
  logout() {
    this.oauthService.logOut();
    Preferences.clear();
  }

  getToken() {
    return this.token =  this.oauthService.getAccessToken();
  }

  refreshToken() {
    this.oauthService.refreshToken();
    return this.token =  this.oauthService.getAccessToken();
  }
}
