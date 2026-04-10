import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormDataFrame {
    constructor(private _formBuilder: FormBuilder) {}

    createMainForm(): FormGroup {
        return this._formBuilder.group({
            id: [''], // ตัวแปรใหม่

            // ข้อมูลการตรวจรถ
            vehicle_inspection_types_id:    ['', Validators.required], // ประเภทรถ
            insurance_types_id:             ['', Validators.required], // ประเภท พ.ร.บ.
            regeister_date:                 [new Date().toISOString().split('T')[0], Validators.required], // วันที่จดทะเบียน
            cc:                             ['', Validators.required], // เครื่องยนต์
            weight:                         ['', Validators.required], // น้ำหนักรถเปล่า
            tax_due_date:                   [new Date().toISOString().split('T')[0], Validators.required], // วันครบภาษี
            tax_renewal_date:               [new Date().toISOString().split('T')[0], Validators.required], // วันที่ยื่นภาษี
            fuel_type:                      ['oil', Validators.required], // ชนิดน้ำมัน
            appointment:                    [new Date().toISOString().split('T')[0]], // วันรับนัดบิล (optional)
            tax:                            [''], // ค่าภาษี
            license_plate:                  ['', Validators.required], // ป้ายทะเบียน
            province_id:                    ['', Validators.required], // จังหวัด
            province:                       [''], // ตัวแปรใหม่
            status:                         ['open'], // สถานะบิล ('open','overdue','unpaid','finish','cancel')
            tax_vehicle:                    ['wait'], // เป็นปุ่มให้ส่งมาสองอันคือ null กับ check
            employee_id:                    ['1'], // ตัวแปรใหม่
            branch_id:                      [''], // สาขา
            date:                           [new Date().toISOString().split('T')[0]], // วันที่
            result:                         [''], // ผลการตรวจรถ
            comments:                       [''], // หมายเหตุ
            description:                    [''], // ตัวแปรใหม่
            remaining_amount:               [''], // ตัวแปรใหม่
            licenseLetters:                 ['', Validators.required], // ตัวแปรใหม่
            licenseNumber:                  ['', Validators.required], // ตัวแปรใหม่

            // ข้อมูลการชำระเงิน
            total:                          ['0.00'], // ยอดสุทธิ (ตัวแปรใหม่)
            discount:                       ['0.00'], // ส่วนลด (ตัวแปรใหม่)

            // เอกสารที่เกี่ยวข้อง
            type_document:                  ['', Validators.required], // ประเภทเอกสาร

            // ข้อมูลบริษัท/ลูกค้า
            is_corporate:                   ['0'], // true/false สำหรับบริษัท (ตัวแปรใหม่)
            name:                           ['', Validators.required], // ชื่อบริษัท/ลูกค้า
            no:                             [''], // หมายเลข
            agent_id:                       [''], // หมายเลข ตัวแทน
            no_cache:                       [''], // หมายเลข cache_autocom
            email:                          [''], // อีเมล
            phone_number1:                  ['', Validators.required], // เบอร์โทร 1
            phone_number2:                  [''], // เบอร์โทร 2
            tax_id:                         [''], // เลขเสียภาษีสำหรับบริษัท
            type:                           ['personal', Validators.required], // ประเภท (vendor, personal)
            is_headquarter:                 [false], // true/false เป็นสำนักงานใหญ่หรือไม่ (ตัวแปรใหม่)
            is_backoffice:                  [false], // ตัวแปรใหม่
            address:                        [''], // ที่อยู่ลูกค้า
            note:                           [''], // โน๊ตช่วยจำ

            // ข้อมูล พ.ร.บ.
            insurance_names_id_prb:         [''], // บริษัทประกัน พ.ร.บ.
            date_start_prb:                 [new Date().toISOString().split('T')[0]], // วันที่เริ่มคุ้มครอง พ.ร.บ.
            date_end_prb:                   [new Date().toISOString().split('T')[0]], // วันที่สิ้นสุด พ.ร.บ.
            amount_paid_prb:                [''], // เบี้ย พ.ร.บ.
            stamp_prb:                      [''], // อากรแสตมป์ พ.ร.บ.
            tax_prb:                        [''], // ภาษีมูลค่าเพิ่ม พ.ร.บ.

            // ข้อมูลประกัน
            insurance_names_id:             ['1'], // บริษัทประกัน
            date_start:                     [new Date().toISOString().split('T')[0]], // วันที่เริ่มคุ้มครองประกัน
            date_end:                       [new Date().toISOString().split('T')[0]], // วันที่สิ้นสุดประกัน
            amount_paid:                    [''], // เบี้ยประกัน
            insurance_renewal_type_id:      [''], // ประเภทประกัน (ป1 ป2 ป2+)

            // รายการบริการที่เกี่ยวข้อง
            List_service_tran:              this._formBuilder.array([]), // รายการบริการ
            prb_service_cache:              [''], // cache คำนวณ พ.ร.บ.

            // รายการเอกสารที่บันทึก
            List_save_document:             this._formBuilder.array([]), // เอกสารไฟล์

            // ข้อมูลชั่วคราว (จะถูกลบหลังจากเชื่อมต่อกับ backend)
            vehicle_id:                     [''], // ตัวแปรใหม่
            invoice_id:                     [''], // ID ใบแจ้งหนี้
            invoice_number:                 [''], // หมายเลขใบแจ้งหนี้

            last_price:                     [''], // ราคาสุดท้าย
            paid_price:                     [''], // ราคาที่จ่าย
            now_paid:                       [''], // จำนวนเงินที่จ่ายในปัจจุบัน
            change_price:                   [''], // เงินทอน

            lackoftax_sum:                  ['0'], // ยอดสุทธิ LackOfTax
            lackoftax_tax:                  ['0'], // ภาษี LackOfTax
            lackoftax_fine:                 ['0'], // ค่าปรับ LackOfTax
        });
    }

    createAddressForm(): FormGroup {
        return this._formBuilder.group({
            address:                        [''],
            zip_code:                       [''],
            subdistricts:                   [''],
            districts:                      [''],
            province:                       [''],
            subdistrict_id:                 [''],
            district_id:                    [''],
            province_id:                    [''],
            customer_id:                    [''],
        });
    }

    createCustomerForm(): FormGroup {
        return this._formBuilder.group({
            name:                           [''],
            phone_number1:                  [''],
            phone_number2:                  [''],
            email:                          [''],
            tax_id:                         [''],
            subdistrict_id:                 [''],
            type:                           [''],
            is_headquarter:                 [''],
            is_backoffice:                  [''],
        });
    }

    createActPeriodForm(): FormGroup {
        return this._formBuilder.group({
            id:                             [''],
            date_start_prb:                 [new Date().toISOString().split('T')[0]],
            date_end_prb:                   [new Date().setFullYear(new Date().getFullYear() + 1)],
            periodrange:                    ['1'],

            prb_value1:                     [''],
            amount_paid_prb:                [''],
            stamp_prb:                      [''],
            tax_prb:                        [''],
            prb_value4:                     [''],
            prb_value5:                     [''],
        });
    }

    createInsurDataForm(): FormGroup {
        return this._formBuilder.group({
            id:                             [''],
            date_start:                     [''],
            date_end:                       [''],
            insurance_names_id:             ['1'],
            insurance_renewal_type_id:      [''],
        });
    }

    createPaidDataForm(): FormGroup {
        return this._formBuilder.group({
            id:                             [''],

            paid_type:                      [''],
            description:                    [''],
        });
    }

    // createInstallmentForm(): FormGroup {
    //     return this._formBuilder.group({
    //         inspection_id:                  [''],
    //         description:                    [''],
    //         paid_price:                     [''],
    //     });
    // }

    /**
     *
     * customer_car form
     */
    createCusCarForm(): FormGroup {
        return this._formBuilder.group({
            registration_date:              ['', Validators.required],
            license_plate:                  ['', Validators.required],
            province_id:                    ['', Validators.required],
            vehicle_inspection_types_id:    ['', Validators.required],
            brand_id:                       ['', Validators.required],
            model_id:                       [''],
            chassis_number:                 [''],
            engine_number:                  [''],
            fuel_type:                      ['', Validators.required],
            cc:                             ['', Validators.required],
            weight:                         ['', Validators.required],
            weight_loaded:                  [''],
            seat_count:                     [''],
            customer_id:                    [''],

            id:                             [''],
            vehicle_gas:                    [''],
        });
    }

    createGasEditForm(): FormGroup {
        return this._formBuilder.group({
            vehicle_id:                     [''],
            gas_type:                       [''],
            gas_position:                   [''],
            gas_model:                      [''],
            gas_brand:                      [''],
            gas_number:                     [''],
            gas_weight:                     [''],
            gas_thick:                      [''],
            gas_capacity:                   [''],
            gas_create:                     [''],
            gas_expire:                     [''],
        });
    }

    createGasAddForm(): FormGroup {
        return this._formBuilder.group({
            gas:                            this._formBuilder.array([]),
        });
    }

    /**
     *
     * customer_data form
     */
    createCusDataForm(): FormGroup {
        return this._formBuilder.group({
            id:                             [''],
            no:                             [''],
            name:                           [''],
            email:                          [''],
            phone_number1:                  [''],
            phone_number2:                  [''],
            tax_id:                         [''],
            type:                           [''],
            is_headquarter:                 [''],
            is_backoffice:                  [''],
            address:                        [''],
        });
    }

    createCusDataAddressForm(): FormGroup {
        return this._formBuilder.group({
            address:                        [''],
            zip_code:                       [''],
            subdistricts:                   [''],
            districts:                      [''],
            province:                       [''],
            subdistrict_id:                 [''],
            district_id:                    [''],
            province_id:                    [''],
            customer_id:                    [''],
        });
    }

    /**
     *
     * carcheck
     */
    createCarCheckForm(): FormGroup {
        return this._formBuilder.group({
            id:                             ['', Validators.required],
            result:                         [''],
        })
    }

    /**
     *
     *  update installment
     */
    createInstallmentForm(): FormGroup {
        return this._formBuilder.group({
            id:                             ['', Validators.required],
            paid_type:                      ['', Validators.required],
            description:                    [''],
        })
    }
}
