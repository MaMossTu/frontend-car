import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';
import { AppModule } from 'app/app.module';
import localeTh from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';

if ( environment.production )
{
    enableProdMode();
}

registerLocaleData(localeTh);


platformBrowserDynamic().bootstrapModule(AppModule)
                        .catch(err => console.error(err));
