import { ModuleWithProviders, NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ProfessionalService } from './lib/professional.service';

export const CONFIG_URL = new InjectionToken<string>('configUrl');
export const BACKEND_PATI = new InjectionToken<string>('backend_pati');
export const LANGUAGE = new InjectionToken<string>('language');
export const ID_APP = new InjectionToken<string>('id_app');

export function initializeConfig(configService: ConfigService, configUrl: string, translateService: TranslateService, language: string, backend_pati: string, id_app: string, professionalService: ProfessionalService): () => Promise<any> {
  return () => configService.loadConfig(configUrl).toPromise().then((data: any) => {
    const config: AuthConfig = data;
    configService.setConfig({
        ...config,
        redirectUri: window.location.origin + config.redirectUri,
        logoutUrl: window.location.origin + config.logoutUrl,
    });
    translateService.setDefaultLang(language);
    translateService.use(language);
    configService.setRoles(data.allowedRoles);
    professionalService.setUrl(backend_pati);
    professionalService.setIdApp(id_app);
  });
}

/*export function initializeConfig(configService: ConfigService, configUrl: string, translateService: TranslateService, language: string): () => Promise<any> {
  return () => configService.loadConfig(configUrl).toPromise().then((config: AuthConfig) => {
    configService.setConfig({
        ...config,
        redirectUri: window.location.origin + config.redirectUri,
        logoutUrl: window.location.origin + config.logoutUrl,
    });
    translateService.setDefaultLang(language);
    translateService.use(language);
  });
}*/

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule,
    OAuthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ConfigService, ProfessionalService]
})
export class AtheneaLoginKeycloakModule {
  static forRoot(configUrl: string, language: string, backend_pati: string, id_app: string): ModuleWithProviders<AtheneaLoginKeycloakModule> {
    return {
      ngModule: AtheneaLoginKeycloakModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfig,
          deps: [ConfigService, CONFIG_URL, TranslateService, LANGUAGE, BACKEND_PATI, ID_APP, ProfessionalService],
          multi: true
        },
        { provide: OAuthStorage, useValue: localStorage },
        { provide: CONFIG_URL, useValue: configUrl },
        { provide: LANGUAGE, useValue: language },
        { provide: BACKEND_PATI, useValue: backend_pati },
        { provide: ID_APP, useValue: id_app },
        ProfessionalService
      ]
    };
  }
}
