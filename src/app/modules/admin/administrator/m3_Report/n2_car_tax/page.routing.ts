import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
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
                resolve: {
                    service_type: () => inject(Service).getserviceType(),
                }
            },
        ]
    }
];
