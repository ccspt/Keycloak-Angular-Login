# Athenea Login Keycloak

Login redirect to keycloak.

## Installation

```bash
npm i athenea-login-keycloak
```

## Usage

To use it, navigate to the `assets` folder and create a file named `sso.config.json` with the following content:

```json
{
    "issuer": "{my_issuer}",
    "redirectUri": "/login-redirect",
    "logoutUrl": "/login-redirect",
    "clientId": "{my_clientId}",
    "responseType": "code",
    "scope": "openid email profile",
    "showDebugInformation": true
}
```

Next, go to `app.module.ts` and add the following import:

```typescript
AtheneaLoginKeycloakModule.forRoot('assets/sso.config.json', 'ca')
```

`'ca'` refers to the default language we want, but if we change it in the code at any point, it will also change in the library.

Now, go to the translation files and add the following:

```json
//ca.json
"redirect_page": {
    "title": "T'estem redirigint a la pàgina.",
    "content": {
        "1": "En cas de no fer-se la redirecció o aquesta trigui molt,",
        "2": "fes click",
        "3": "aquí",
        "4": "o contacta amb nosaltres."
    }
},
````
```json
//en.json
"redirect_page": {
    "title": "We are redirecting you to the page.",
    "content": {
        "1": "If the redirection is not done or it takes a long time,",
        "2": "click",
        "3": "here",
        "4": "or contact us."
    }
},
```
```json
//es.json
"redirect_page": {
      "title": "Te estamos redirigiendo a la página.",
      "content": {
          "1": "En caso de no hacerse la redirección o ésta tarde mucho,",
          "2": "haz click",
          "3": "aquí",
          "4": "o contacta con nosotros."
      }
  },
```

The text can be changed, but the translation keys should not be changed.

Also, in the `assets` folder, in the `img` directory, we need to add the `logoLogin.svg` file, which will be the logo that appears on the redirection page, and the `background.png` file, which will be the application's background by adding the following scss to `global.scss`:

```scss
.bg-brand-logo{
    --background: var(--brand-bg) no-repeat center/cover fixed;
}
```

And the following variable to `variables.scss`:

```scss
--brand-bg: url("../assets/img/background.png");
```

Finally, go to the `app-routing.module.ts` file, import the library, and add the following routes:

```typescript
import { AtheneaLoginKeycloakGuardService, LoginRedirectPageComponent } from 'athenea-login-keycloak';

{
  path: '**',
  redirectTo: 'login-redirect',
  pathMatch: 'full'
},
{
  path: 'login-redirect',
  component: LoginRedirectPageComponent
},
```

Additionally, on the first page of our application, we need to add the GuardService from the library:

```typescript
{
  path: 'home',
  loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
  canActivate: [AtheneaLoginKeycloakGuardService]
}

```

A complete example of this file is as follows:

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AtheneaLoginKeycloakGuardService, LoginRedirectPageComponent } from 'athenea-login-keycloak';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AtheneaLoginKeycloakGuardService]
  },
  {
    path: '**',
    redirectTo: 'login-redirect',
    pathMatch: 'full'
  },
  {
    path: 'login-redirect',
    component: LoginRedirectPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

And to be able to log out of the application, we need to add the following function to the corresponding button:

```typescript
constructor(
  public authService: AtheneaLoginKeycloakService
) { }

logout() {
  this.authService.logout();
}
```

```html
<ion-button color="primary" slot="icon-only" (click)="logout()">
  <ion-icon name="power-outline" class="logout"></ion-icon>
</ion-button>
```

## License

ISC