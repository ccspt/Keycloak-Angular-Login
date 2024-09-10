import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AtheneaLoginKeycloakService } from "./athenea-login-keycloak.service";


@Injectable({
    providedIn: 'root'
})
export class ProfessionalService { 

    url: string = '';
    id_app: string = '';

    constructor(
        public http: HttpClient    
    ) { } 

    setUrl (url: string) {
        this.url = url;
    }

    setIdApp (id: string) {
        this.id_app = id;
    }

    async assignDynamicRoles(token: string) {
        const url = `${this.url}/dynamic-roles/assign`;
        const body = { clientId: this.id_app };
        const httpOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        };
        try {
            const response = await this.http.put(url, body, httpOptions).toPromise();
            return response;
        } catch (error) {
            console.error('Error assigning dynamic roles', error);
            throw error;
        }
    }
}