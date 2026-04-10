import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    createCustome(data: any): Observable<any> {
        return this.post('/api/customer/add', data);
    }
    createCustomerAddress(data: any): Observable<any> {
        return this.post('/api/customer_add/add', data);
    }
    update(id: number, data: any): Observable<any> {
        return this.post(`/api/inspections/update/${id}`, data);
    }

    getVehicle(): Observable<any> {
        return this.get('/api/vehicle/show');
    }
    getCustomer(): Observable<any> {
        return this.get('/api/customer/show');
    }
    getCustomerID(id: number): Observable<any> {
        return this.get(`/api/customer/showID/${id}`);
    }
    getInspectionsID(id: number): Observable<any> {
        return this.get(`/api/installment/showID_by_inspection/${id}`)
    }

    pushDiscount(data: any, id: number): Observable<any> {
        return this.put(`/api/update/status/inspection/discount/${id}`, data);
    }
    cal_tax(data: any): Observable<any> {
        return this.post(`/api/inspections/cal_tax`, data);
    }
    cal_gas(data: any): Observable<any> {
        return this.post(`/api/inspections/cal_gas`, data);
    }
    cal_checkcar(data: any): Observable<any> {
        return this.post(`/api/inspections/cal_checkcar`, data);
    }
    cal_setting(data: any): Observable<any> {
        return this.post(`/api/inspections/setting_cal`, data);
    }
    installment_add(data: any): Observable<any> {
        return this.post(`/api/installment/add`, data);
    }
    getPaymentInfo(id: any): Observable<any> {
        return this.get(`/api/installment/getPaymentInfo/${id}`);
    }

    getInsuranceID(id: any): Observable<any> {
        return this.get(`/api/vehicle/insuranceTypes/showID/${id}`);
    }
    getInsurName(): Observable<any> {
        return this.get('/api/insurance_name/showall');
    }
    getCustomerNo(): Observable<any> {
        return this.get('/api/customer/showall_backoffice');
    }

    getStampRate(id: any): Observable<any> {
        return this.get(`/api/vehicle/insuranceTypes/showID/${id}`);
    }
    getInsurRenewType(): Observable<any> {
        return this.get('/api/InsuranceRenewalTypes/showall');
    }
    getCustomersAutoComplete(key: string = '', limit: number = 10): Observable<any> {
        const params = new HttpParams()
            .set('key', key ?? '')
            .set('limit', String(limit ?? 10));

        // ใช้ _httpClient เพราะต้องส่ง query params
        return this._httpClient.get<any>(
            `${environment.API_URL}/api/customer/get_customers`,
            { ...this.httpOptions, params }
        );
    }

    updateTransec(data: any, id: string): Observable<any> { return this.put(`/api/installment/update/${id}`, data); }
    deleteTransec(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/installment/delete/${id}`, this.httpOptions); }

    /** CusCar */
    createGas(data: any): Observable<any> { return this.post('/api/vehiclegas/add', data); }
    updateGas(data: any, id: string): Observable<any> { return this.post(`/api/vehiclegas/update/${id}`, data); }
    delete_gas(id: string) { return this._httpClient.delete(`${environment.API_URL}/api/vehiclegas/delete/${id}`, this.httpOptions); }
    getGasByID(id: string): Observable<any> { return this.get(`/api/vehiclegas/showallID/${id}`); }

    getVehicle_CusCar(id: string): Observable<any> { return this.get(`/api/vehicle/showID/${id}`); }
    getCusCarItem(id: string): Observable<any> { return this.get(`/api/vehicle/showID/${id}`); }

    update_CasCar(data: any, id: string): Observable<any> { return this.post(`/api/vehicle/update/${id}`, data); }

    getGasBrands(): Observable<any> { return this.get('/api/Gas/brands/show'); }

    /** Cusdata */
    createCusAddress(data: any): Observable<any> { return this.post('/api/customer_add/add', data); }
    updateCus(data: any, id: string): Observable<any> { return this.post(`/api/customer/update/${id}`, data); }
    updateCusAddress(data: any, id: number): Observable<any> { return this.post(`/api/customer_add/update/${id}`, data); }

    /** CarCheck */
    update_CarCheck(data: any, id: string): Observable<any> { return this.put(`/api/update/inspection_result/${id}`, data); }
    getProvince() {
        return this._httpClient.get(environment.API_URL + '/api/provinces/show');
    }
    getDistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/provinces/filter/' + id);
    }
    getSubdistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/districts/filter/' + id);
    }
    getCusAddressById(id: string): Observable<any> {
        return this.get(`/api/customer_add/showID/${id}`);
    }
    deleteCusAddress(id: number): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/customer_add/delete/${id}`, this.httpOptions); }
    getPageCustomer(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/customer/getPage`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }

}
