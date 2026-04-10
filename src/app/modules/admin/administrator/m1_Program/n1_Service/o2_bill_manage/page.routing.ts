import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { InspectionBillComponent } from './edit-bill/edit-bill.component';

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
                path: 'edit-bill/:id',
                component: InspectionBillComponent,
            },
        ]
    }
];
