import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ProfessionalService { 

    url: string = '';

    constructor(
        public http: HttpClient,
    ) { } 

    setUrl (url: string) {
        this.url = url;
    }

    async assignDynamicRoles(username: string) {
        const url = `${this.url}/dynamic-roles/assign`;
        const body = { username: username, clientId: 'icura-backoffice' };
        try {
            const response = await this.http.put(url, body).toPromise();
            return response;
        } catch (error) {
            console.error('Error assigning dynamic roles', error);
            throw error;
        }
    }
}