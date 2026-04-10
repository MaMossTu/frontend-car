import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { BaseService } from 'app/app.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class Service extends BaseService {

    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    // CRUD operations
    create(data: any): Observable<any> { return this.post('/api/customer/add', data); }
    createCusAddress(data: any): Observable<any> { return this.post('/api/customer_add/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/customer/update/${id}`, data); }
    updateCusAddress(data: any, id: number): Observable<any> { return this.post(`/api/customer_add/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/customer/delete/${id}`, this.httpOptions); }
    deleteCusAddress(id: number): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/customer_add/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/customer/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }
    getCustomerID(id: string): Observable<any>{
        return this.get(`/api/customer/showID/${id}`);
    }

    getCusAddressById(id: string): Observable<any> {
        return this.get(`/api/customer_add/showID/${id}`);
    }
}
