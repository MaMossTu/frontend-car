import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { BaseService } from 'app/app.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class Service extends BaseService {
    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    // CRUD operations
    create(data: any): Observable<any> {
        return this.post('/api/inspections/add', data);
    }
    createCustomerAddress(data: any): Observable<any> {
        return this.post('/api/customer_add/add', data);
    }
    update(id: number, data: any): Observable<any> {
        return this.post(`/api/inspections/update/${id}`, data);
    }
    update_type(id: number, data: any): Observable<any> {
        return this.post(`/api/inspections/status`, data);
    }
    delete(id: string): Observable<any> {
        return this._httpClient.delete(
            `${environment.API_URL}/api/vehicle/brands/delete/${id}`,
            this.httpOptions
        );
    }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/inspections/getPage`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }

    getVehicle(): Observable<any> {
        return this.get('/api/vehicle/show');
    }
    getCustomer(): Observable<any> {
        return this.get('/api/customer/show');
    }
    pushDiscount(data: any, id: string): Observable<any> {
        return this.put(`/api/update/status/inspection/discount/${id}`, data);
    }
    cal_tax(data: any): Observable<any> {
        return this.post(`/api/inspections/cal_tax`, data);
    }
    getPage_invoice(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/inspections/getPage_report`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }
}
