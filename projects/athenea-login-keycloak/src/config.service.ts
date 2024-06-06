import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AuthConfig | undefined;
  private roles: any | undefined;

  constructor(private http: HttpClient) { }

  loadConfig(configUrl: string): Observable<any> {
    return this.http.get(configUrl);
  }

  setConfig(config: AuthConfig) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  loadRoles(rolsUrl: string): Observable<any> {
    return this.http.get(rolsUrl);
  }

  setRoles(roles: any) {
    this.roles = roles;
  }

  getRoles() {
    return this.roles;
  }
}
