import { Route } from '@angular/router';
import { SettingsComponent } from 'app/modules/admin/pages/settings/settings.component';
import { UserAssetTypeResolver } from '../../marketing/user/user.resolvers';

export const settingsRoutes: Route[] = [
    {
        path     : '',
        component: SettingsComponent,
        resolve: {
            asset_types: UserAssetTypeResolver,
        }
    }
];
