import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { SettingPermissionComponent } from './setting-permission/setting-permission.component';
import { inject } from '@angular/core';
import { Service } from './page.service';

export const positionRoute: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
            },
            {
                path: 'setting-permission/:id',
                component: SettingPermissionComponent,
                resolve: {
                    data: (route) => inject(Service).get(route.params['id']),
                }
            },
        ]
    }
];
