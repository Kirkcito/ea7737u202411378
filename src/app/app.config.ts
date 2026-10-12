import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {MAT_ICON_DEFAULT_OPTIONS} from '@angular/material/icon';
import {routes} from './app.routes';

/**
 * @author Kirk Douglas Quiliano Motta
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}),
      lang: 'en',
      fallbackLang: 'en'
    }),
    {provide: MAT_ICON_DEFAULT_OPTIONS, useValue: {fontSet: 'material-symbols-outlined'}}
  ]
};
