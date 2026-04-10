import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { BranchListComponent } from './list-branch/list.component';
import { FormComponent } from './form/form.component';

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
                path: 'list-branch',
                component: BranchListComponent,
            },
            {
                path: 'form',
                component: FormComponent,
            },
            {
                path: 'edit/:id',
                component: FormComponent,
            },
        ],
    }
];
