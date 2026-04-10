import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

export class BaseService {
    private token = localStorage.getItem('accessToken') || '';
    protected httpOptions = { headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }) };

    constructor(protected _httpClient: HttpClient) {}

    // Generalized GET request
    protected get<T>(url: string): Observable<T> {
        return this._httpClient.get<T>(environment.API_URL + url, this.httpOptions);
    }

    // Generalized GET request (for image)
    protected getIm(url: string): Observable<Blob> {
        return this._httpClient.get<Blob>(url, { responseType: 'blob' as 'json' });
    }

    // Generalized POST request
    protected post<T>(url: string, data: any): Observable<T> {
        return this._httpClient.post<T>(environment.API_URL + url, data, this.httpOptions);
    }

    // Generalized PUT request
    protected put<T>(url: string, data: any): Observable<T> {
        return this._httpClient.put<T>(environment.API_URL + url, data, this.httpOptions);
    }

    // Fetching 'Vehicle(รถ)' APIs
    getInspection(): Observable<any> { return this.get('/api/vehicle/inspection/show'); }
    getInsurance(): Observable<any> { return this.get('/api/vehicle/insuranceTypes/show'); }
    getBrand(): Observable<any> { return this.get('/api/vehicle/brands/show'); }
    getModel(): Observable<any> { return this.get('/api/vehicle/models/show'); }
    getYear(): Observable<any> { return this.get('/api/vehicle/years/show'); }
    getSubmodels(): Observable<any> { return this.get('/api/vehicles/submodel/show'); }
    getBodies(): Observable<any> { return this.get('/api/vehicle/bodies/show'); }
    getTypes(): Observable<any> { return this.get('/api/vehicle/types/show'); }
    getUsages(): Observable<any> { return this.get('/api/vehicle/usages/show'); }
    getSizes(): Observable<any> { return this.get('/api/vehicle/sizes/show'); }
    getVehicle(id: string): Observable<any> { return this.get(`/api/vehicle/showID/${id}`); }

    getFilterModel(id: string): Observable<any> {
        return this.get<any>(`/api/vehicle/brands/filter_vehicleModel/${id}`).pipe(map(resp => resp.data[0]));
    }
    getFilterYear(id: string): Observable<any> {
        return this.get<any>(`/api/vehicle/models/filter_vehicleYear/${id}`).pipe(map(resp => resp.data[0]));
    }
    getFilterSubmodels(id: string): Observable<any> {
        return this.get<any>(`/api/vehicle/years/filter_vehicleSubmodel/${id}`).pipe(map(resp => resp.data[0]));
    }

    // Fetching 'Branche(สาขา)' APIs
    getBrache(): Observable<any> { return this.get('/api/Brache/show'); }
    getBracheID(id: number): Observable<any> { return this.get(`/api/Brache/showID/${id}`); }

    // Fetching 'provinces(จังหวัด)' APIs
    getProvinces(): Observable<any> { return this.get('/api/provinces/show'); }
    getProvincesByID(id: string): Observable<any> { return this.get(`/api/provinces/showID/${id}`); }
    getBillById(id: string): Observable<any> { return this.get(`/api/inspections/showID/${id}`); }

    getFilterProvinces(id: string): Observable<any> {
        return this.get<any>(`/api/provinces/filter/${id}`).pipe(map(resp => resp.data[0]));
    }

    // Fetching 'districts(อำเภอ)' APIs
    getDistricts(id: string): Observable<any> {
        return this.get<any>(`/api/provinces/filter/${id}`).pipe(map(resp => resp.data[0]));
    }

    // Fetching 'subdistricts(ตำบล)' APIs
    getSubDistricts(id: string): Observable<any> {
        return this.get<any>(`/api/districts/filter/${id}`).pipe(map(resp => resp.data[0]));
    }

    // Fetching 'Branche_address(ที่อยู่สาขา)' APIs

    // Fetching 'customer(ลูกค้า)' APIs

    // Fetching 'department(ฝ่าย)' APIs

    // Fetching 'subdepartment(แผนก)' APIs

    // Fetching 'customer_add(ที่อยู่ลูกค้า)' APIs

    // Fetching 'permissions(สิทธิ์)' APIs

    // Fetching 'role(ตำแหน่ง)' APIs

    // Fetching 'rolepermission(สิทธิ์ของตำแหน่ง)' APIs

    // Fetching 'employees(พนักงาน)' APIs
    getEmployee(): Observable<any> { return this.get('/api/employees/show'); }

    // Fetching 'users(ผู้ใช้งาน)' APIs

    // Fetching 'useposition(ตำแหน่งผู้ใช้งาน)' APIs

    // Fetching 'services(บริการ)' APIs
    getServices(): Observable<any> { return this.get('/api/services/show'); }

    // Fetching 'inspections(ใบวางบิล)' APIs
    getInspections(): Observable<any> { return this.get('/api/inspections/show'); }

    // Fetching 'servicetransactions(ธุรกรรม)' APIs

    // Fetching 'Menus(เมนู)' APIs

    // Fetching 'MenusPermission(สิทธิ์เมนูใช้งาน)' APIs

    // Fetching 'permissions(จัดการสิทธิ์การใช้งาน)' APIs

    // Fetching 'Inventory(สต๊อกสินค้า)' APIs

    // Fetching 'Item(อะไหล่)' APIs

    // Fetching 'ItemType(ประเภทอะไหล่)' APIs

    // Fetching '' APIs


    // // Fetching '' APIs
    // get(): Observable<any> { return this.get(''); }
    // get(id: string): Observable<any> { return this.get(`${id}`); }

    // getFilter(id: string): Observable<any> {
    //     return this.get<any>(`${id}`).pipe(map(resp => resp.data[0]));
    // }

    // Error Handling
    protected handleError(error: any): Observable<never> {
        const errorMessage = error?.error?.message || 'Unknown error';
        return throwError(errorMessage);
    }
}
