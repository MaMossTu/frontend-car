import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { AddressComponent } from './address/address.component';

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
                path: 'list/address',
                component: AddressComponent,
            },
            {
                path: 'list/address/:id',
                component: AddressComponent,

            },

        ]
    }
];
