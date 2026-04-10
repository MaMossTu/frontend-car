import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { inject } from '@angular/core';
import { Service } from 'app/modules/admin/fix/page.service';

export const positionRoute: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list/deposit',
                component: ListComponent,
                data: {
                    type : 'deposit'
                },
                resolve: {
                    service: () => inject(Service).getService(),
                }
            },
            {
                path: 'list/withdraw',
                component: ListComponent,
                data: {
                    type : 'withdraw'
                },
                resolve: {
                    service: () => inject(Service).getService(),
                }
            },
        ]
    },
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list/withdraw',
                component: ListComponent,
                data: {
                    type : 'withdraw'
                },
                resolve: {
                    service: () => inject(Service).getService(),
                }
            },
        ]
    }
];
