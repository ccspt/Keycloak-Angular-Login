import { ModuleWithProviders, NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthConfig } from 'angular-oauth2-oidc';
import { AtheneaLoginKeycloakComponent } from './public-api';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

export const CONFIG_URL = new InjectionToken<string>('configUrl');

export function initializeConfig(configService: ConfigService, configUrl: string): () => Promise<any> {
  return () => configService.loadConfig(configUrl).toPromise().then((config: AuthConfig) => {
    configService.setConfig({
        ...config,
        redirectUri: window.location.origin + config.redirectUri,
        logoutUrl: window.location.origin + config.logoutUrl,
    });
  });
}

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, TranslateModule],
  providers: [ConfigService],
  declarations: [AtheneaLoginKeycloakComponent],
  exports: [AtheneaLoginKeycloakComponent]
})
export class AtheneaLoginKeycloakModule {
  static forRoot(configUrl: string): ModuleWithProviders<AtheneaLoginKeycloakModule> {
    return {
      ngModule: AtheneaLoginKeycloakModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfig,
          deps: [ConfigService, CONFIG_URL],
          multi: true
        },
        { provide: CONFIG_URL, useValue: configUrl }
      ]
    };
  }
}
