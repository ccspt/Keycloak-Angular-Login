import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AtheneaLoginKeycloakService } from './athenea-login-keycloak.service';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class AtheneaRolesServie {

    correctRoles: boolean = false;
    correctRolesList: string[] = [];
 
    constructor(
        public authService: AtheneaLoginKeycloakService,
        public configService: ConfigService,
    ) {}

    async checkRoles () {
        this.correctRolesList = this.configService.getRoles();
        await this.authService.loadUser();
        if (this.authService.getToken()) {
            if (this.authService.token) {
                let token = this.authService.token;
                let tokenDecoded: any = jwtDecode(token);
                if (tokenDecoded && tokenDecoded.resource_access) {
                    this.correctRoles = this.checkCorrectRoles(tokenDecoded.resource_access);
                }
            }
        }
        
    }

    checkCorrectRoles(resourceAccess: any): boolean {
        for (let resource in resourceAccess) {
            if (resourceAccess.hasOwnProperty(resource)) {
                const roles = resourceAccess[resource].roles;
                for (let role of this.correctRolesList) {
                    if (roles.includes(role)) {
                        this.correctRoles = true;
                        return true; 
                    }
                }
            }
        }
        return false;
    }

    async getCapacities(appName: string) {
        const token = this.authService.getToken();
        if (token) {
            let tokenDecoded: any = jwtDecode(token);
            if (tokenDecoded && tokenDecoded.resource_access && tokenDecoded.resource_access[appName]) {
                return tokenDecoded.resource_access[appName]['roles'] || null;
            }
        }
        return null;
    }

    async getAllRoles() {
        await this.authService.loadUser();
        if (this.authService.token) {
            let token = this.authService.token;
            let tokenDecoded: any = jwtDecode(token);
            if (tokenDecoded && tokenDecoded.resource_access) {
                return tokenDecoded.resource_access;
            }
        }
    }
}

