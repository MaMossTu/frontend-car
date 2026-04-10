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
    create(data: any): Observable<any> { return this.post('/api/inspections/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/inspections/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/inspections/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/inspections/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }
    getPage2(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/installment/invoice`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }

    getInspectionsID(id: number): Observable<any> {
        return this.get(`/api/installment/showID_by_inspection/${id}`);
    }
    installment_add(data: any): Observable<any> {
        return this.post(`/api/installment/add`, data);
    }
    getPaymentInfo(id: any): Observable<any> {
        return this.get(`/api/installment/getPaymentInfo/${id}`);
    }
    pushDiscount(data: any, id: number): Observable<any> {
        return this.put(`/api/update/status/inspection/discount/${id}`, data);
    }
    getData(id: number): Observable<any> {
        return this.get(`/api/inspections/showID/${id}`);
    }
    updatstatus(data: any, id: number): Observable<any> {
        return this.put(`/api/update/status/inspecions/${id}`, data);
    }
    getProvince() {
        return this._httpClient.get(environment.API_URL + '/api/provinces/show');
    }

    getCustomer() {
        return this._httpClient.get(environment.API_URL + '/api/customer/show');
    }

    createCustomer(data: any): Observable<any> {
        return this.post('/api/customer/add', data);
    }
    
    createCustomerAddress(data: any): Observable<any> {
        return this.post('/api/customer_add/add', data);
    }

    getCustomerById(id: number) {
        return this._httpClient.get(environment.API_URL + '/api/customer/showID/' + id);
    }
    getCustomerAdderssById(id: number) {
        return this._httpClient.get(environment.API_URL + '/api/customer_add/showID/' + id);
    }

    getDistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/provinces/filter/' + id);
    }
    getSubdistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/districts/filter/' + id);
    }

    updateTransec(data: any, id: string): Observable<any> { return this.put(`/api/installment/update/${id}`, data); }
    deleteTransec(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/installment/delete/${id}`, this.httpOptions); }
}
