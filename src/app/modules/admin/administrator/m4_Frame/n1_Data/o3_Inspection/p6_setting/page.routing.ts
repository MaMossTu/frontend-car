import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { Service } from './page.service';
import { inject } from '@angular/core';


export const positionRoute: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
                resolve: {
                    service: () => inject(Service).getservice(),
                    vehicle_inspection_type: () => inject(Service).getvehicle_inspection_type(),

                }
            },
        ]
    }
];
