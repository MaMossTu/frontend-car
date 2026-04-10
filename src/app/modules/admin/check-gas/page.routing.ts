import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { ListfromComponent } from './form/form.component';
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
                path: 'list/formGas',
                component: ListfromComponent,
                data: {
                    type: 'NEW'
                },
                resolve: {
                    service: () => inject(Service).getService(),
                    customer: () => inject(Service).getCustomer(),
                    branch: () => inject(Service).getBranch(),
                    vehicle: () => inject(Service).getvehicle(),
                    province: () => inject(Service).getProvince(),
                    filteredInsuranceTypes: () => inject(Service).getInsuranceType(),
                    listVehicleInspection: () => inject(Service).getVehicleInspection(),
                    brands: () => inject(Service).getVehicleBrand(),
                    engineers: () => inject(Service).getEngineer(),
                    
                }
            },
            {
                path: 'edit/formfix/:id',
                component: ListfromComponent,
                data: {
                    type: 'EDIT'
                },
                resolve: {
                    
                    service: () => inject(Service).getService(),
                    customer: () => inject(Service).getCustomer(),
                    branch: () => inject(Service).getBranch(),
                    vehicle: () => inject(Service).getvehicle(),
                    province: () => inject(Service).getProvince(),
                    filteredInsuranceTypes: () => inject(Service).getInsuranceType(),
                    listVehicleInspection: () => inject(Service).getVehicleInspection(),
                    brands: () => inject(Service).getVehicleBrand(),
                }
            },
        ]
    }
];
