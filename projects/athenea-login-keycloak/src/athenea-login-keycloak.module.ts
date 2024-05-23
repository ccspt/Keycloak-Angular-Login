import { ModuleWithProviders, NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthConfig } from 'angular-oauth2-oidc';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';

export const CONFIG_URL = new InjectionToken<string>('configUrl');
export const LANGUAGE = new InjectionToken<string>('language');

export function initializeConfig(configService: ConfigService, configUrl: string, translateService: TranslateService, language: string): () => Promise<any> {
  return () => configService.loadConfig(configUrl).toPromise().then((config: AuthConfig) => {
    configService.setConfig({
        ...config,
        redirectUri: window.location.origin + config.redirectUri,
        logoutUrl: window.location.origin + config.logoutUrl,
    });
    translateService.setDefaultLang(language);
    translateService.use(language);
  });
}

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
  providers: [ConfigService]
})
export class AtheneaLoginKeycloakModule {
  static forRoot(configUrl: string, language: string): ModuleWithProviders<AtheneaLoginKeycloakModule> {
    return {
      ngModule: AtheneaLoginKeycloakModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfig,
          deps: [ConfigService, CONFIG_URL, TranslateService, LANGUAGE],
          multi: true
        },
        { provide: CONFIG_URL, useValue: configUrl },
        { provide: LANGUAGE, useValue: language }
      ]
    };
  }
}
