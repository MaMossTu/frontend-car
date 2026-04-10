import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    create(data: any): Observable<any> {
        return this.post('/api/add/inspecions/gas', data);
    }
    customerCreate(data: any): Observable<any> {
        return this.post('/api/customer/add', data);
    }
    customerCreateAddress(data: any): Observable<any> {
        return this.post('/api/customer_add/add', data);
    }

    carCreate(data: any): Observable<any> {
        return this.post('/api/vehicle/add', data);
    }
    update(id: string, data: any): Observable<any> {
        return this.put(`/api/update/inspecions/gas/${id}`, data);
    }
    delete(id: string): Observable<any> {
        return this._httpClient.delete(
            `${environment.API_URL}/api/deleteworkorder/${id}`,
            this.httpOptions
        );
    }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/WorkOrder/getPage`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }
    getPageCustomer(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/customer/getPage`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }

    getPageCar(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/vehicle/getPage`,
                dataTablesParameters,
                this.httpOptions
            )
            .pipe(map((response) => response.data as DataTablesResponse));
    }

    getAll(dataTablesParameters: any): Observable<any> {
        let token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this._httpClient
            .post<any>(
                `${environment.API_URL}/api/Getpage/check_gas`,
                dataTablesParameters,
                { headers }
            )
            .pipe(
                map((data: any) => {
                    return data.data;
                })
            );
    }

    getById(id: any) {
        return this._httpClient.get(
            `${environment.API_URL}/api/WorkOrder/showID/` + id
        );
    }

    getService() {
        return this._httpClient.get(environment.API_URL + '/api/services/showall');
    }
    getService_() {
        return this._httpClient.get(environment.API_URL + '/api/services/show');
    }

    getCustomer() {
        return this._httpClient.get(environment.API_URL + '/api/customer/show');
    }

    getvehicle() {
        return this._httpClient.get(environment.API_URL + '/api/vehicle/show');
    }
    getEngineer() {
        return this._httpClient.get(environment.API_URL + '/api/employees/showall_engineer');
    }

    getBranch() {
        return this._httpClient.get(environment.API_URL + '/api/Brache/show');
    }

    getProvince() {
        return this._httpClient.get(environment.API_URL + '/api/provinces/show');
    }
    getDistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/provinces/filter/' + id);
    }
    getSubdistrict(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/districts/filter/' + id);
    }
    getVehicleInspection() {
        return this._httpClient.get(environment.API_URL + '/api/vehicle/inspection/show');
    }
    getInsuranceType() {
        return this._httpClient.get(environment.API_URL + '/api/vehicle/insuranceTypes/show');
    }

    getVehicleBrand() {
        return this._httpClient.get(environment.API_URL + '/api/vehicle/brands/show');
    }
    getVehicleModel(id: any) {
        return this._httpClient.get(environment.API_URL + '/api/vehicle/brands/filter_vehicleModel/' + id);
    }

    updateStatus(id: number, data: object) {
        return this._httpClient.put(`${environment.API_URL}/api/WorkOrder/update_status/` + id, data)
    }
    updateGas(id: number, data: object) {
        return this._httpClient.post(`${environment.API_URL}/api/update/inspecions/gas/` + id, data)
    }
}
