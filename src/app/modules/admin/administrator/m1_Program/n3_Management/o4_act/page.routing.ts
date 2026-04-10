import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { inject } from '@angular/core';
import { Service } from '../../../m0_Dashboard/n2_bill_create/page.service';


export const positionRoute: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
                resolve: {
                    insurance_name: () => inject(Service).getInsurName(),
                }
            },
        ]
    }
];
