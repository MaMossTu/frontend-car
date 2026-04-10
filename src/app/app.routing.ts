import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'Dashboard/list' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'Dashboard/list' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then((m) => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then((m) => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then((m) => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then((m) => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then((m) => m.AuthSignUpModule) },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then((m) => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then((m) => m.AuthUnlockSessionModule) },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // please check 'app/modules/admin/administrator/MenuBarTree.txt' before edit this

            // m0 dashboard
            { path: 'Dashboard', loadChildren: () => import('app/modules/admin/administrator/m0_Dashboard/n1_dashboard/page.module').then((m) => m.Module) },
            { path: 'test', loadChildren: () => import('app/modules/admin/administrator/m0_Dashboard/test/page.module').then((m) => m.Module) },
            { path: 'bill_create', loadChildren: () => import('app/modules/admin/administrator/m0_Dashboard/n2_bill_create/page.module').then((m) => m.Module) },
            { path: 'bill_company_create', loadChildren: () => import('app/modules/admin/administrator/m0_Dashboard/n3_bill_company_create/page.module').then((m) => m.Module) },

            // m1 program
            // { path: 'rate_price', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n1_Service/o1_rate_price/page.module').then((m) => m.Module) },
            { path: 'bill_manage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n1_Service/o2_bill_manage/page.module').then((m) => m.Module) },
            { path: 'renewal_reminder', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n1_Service/o3_renewal_reminder/page.module').then((m) => m.Module) },

            { path: 'customer_car', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n2_Customer/o1_customer_car/page.module').then((m) => m.Module) },
            { path: 'customer_data', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n2_Customer/o2_customer_data/page.module').then((m) => m.Module) },

            { path: 'vehicle_check', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o1_vehicle_check/page.module').then((m) => m.Module) },
            { path: 'car_taxManage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o2_car_tax/page.module').then((m) => m.Module) },
            { path: 'gas_testManage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o3_gas_check/page.module').then((m) => m.Module) },
            { path: 'actManage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o4_act/page.module').then((m) => m.Module) },
            { path: 'insuranceManage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o5_insurance/page.module').then((m) => m.Module) },
            { path: 'emsManage', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n3_Management/o6_ems/page.module').then((m) => m.Module) },

            { path: 'doc', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n4_Document/o1_doc/page.module').then((m) => m.Module) },
            { path: 'doc_history', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n4_Document/o2_doc_history/page.module').then((m) => m.Module) },
            { path: 'doc_history_branch', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n4_Document/o2_doc_history_branch/page.module').then((m) => m.Module) },
            { path: 'doc_customer', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n4_Document/o3_doc_customer/page.module').then((m) => m.Module) },
            { path: 'doc_report_branch', loadChildren: () => import('app/modules/admin/administrator/m1_Program/n4_Document/o6_report_doc_branch/page.module').then((m) => m.Module) },

            // m2 accounting
            { path: 'installments', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n1_Debtor/o1_installments/page.module').then((m) => m.Module) },
            { path: 'invoice', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n1_Debtor/o2_invoice/page.module').then((m) => m.Module) },

            { path: 'statement', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n2_Commission/o1_statement/page.module').then((m) => m.Module) },
            { path: 'com_employee', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n2_Commission/o2_com_employee/page.module').then((m) => m.Module) },
            { path: 'com_bill', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n2_Commission/o3_com_bill/page.module').then((m) => m.Module) },
            { path: 'expenses', loadChildren: () => import('app/modules/admin/administrator/m2_Accounting/n3_expenses/page.module').then((m) => m.Module) },

            // m3 report
            { path: 'car_tax', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n2_car_tax/page.module').then((m) => m.Module) },
            { path: 'ems', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n3_Ems/page.module').then((m) => m.Module) },
            { path: 'expense', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n4_expense/page.module').then((m) => m.Module) },
            { path: 'gas_test', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n5_gas_test/page.module').then((m) => m.Module) },
            { path: 'daily_report', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n6_1_daily_report/page.module').then((m) => m.Module) },
            { path: 'daily_service_report', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n6_2_daily_service_report_new/page.module').then((m) => m.Module) },
            { path: 'act', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n7_Act/page.module').then((m) => m.Module) },
            { path: 'insurance_re', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n8_insurance/page.module').then((m) => m.Module) },
            { path: 'commission', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n9_commission/page.module').then((m) => m.Module) },
            { path: 'profit', loadChildren: () => import('app/modules/admin/administrator/m3_Report/n10_profit/page.module').then((m) => m.Module) },

            // m4 frame
            { path: 'doc_type', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o1_Document/p1_doc_type/page.module').then((m) => m.Module) },
            { path: 'doc_service', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o1_Document/p2_doc_service/page.module').then((m) => m.Module) },

            { path: 'brands', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p1_VehicleBrands/page.module').then((m) => m.Module) },
            { path: 'models', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p2_VehicleModels/page.module').then((m) => m.Module) },
            { path: 'years', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p3_VehicleYears/page.module').then((m) => m.Module) },
            { path: 'submodel', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p4_VehicleSubmodels/page.module').then((m) => m.Module) },
            { path: 'bodies', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p5_VehicleBodies/page.module').then((m) => m.Module) },
            { path: 'types', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p6_VehicleTypes/page.module').then((m) => m.Module) },
            { path: 'usage', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p7_VehicleUsages/page.module').then((m) => m.Module) },
            { path: 'sizes', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p8_VehicleSizes/page.module').then((m) => m.Module) },
            { path: 'gasbrands', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p9_GasBrands/page.module').then((m) => m.Module) },

            { path: 'inspectiontypes', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p1_inspectiontypes/page.module').then((m) => m.Module) },
            { path: 'InsuranceTypes', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p2_InsuranceTypes/page.module').then((m) => m.Module) },
            { path: 'insurance', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p3/page.module').then((m) => m.Module) },
            { path: 'insur_data', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p4/page.module').then((m) => m.Module) },
            { path: 'insurrenewTypes', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p5_insur_renew_type/page.module').then((m) => m.Module) },

            { path: 'user', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o1_user/page.module').then((m) => m.Module) },
            { path: 'employee', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o2_employee/page.module').then((m) => m.Module) },
            { path: 'commission1', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o3_commission/page.module').then((m) => m.Module) },
                { path: 'branch', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/p1_branch/page.module').then((m) => m.Module) },
                { path: 'position', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/p2_position/page.module').then((m) => m.Module) },
                { path: 'department', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/p3_department/page.module').then((m) => m.Module) },
                // { path: 'role', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/p4_role/page.module').then((m) => m.Module) },
                { path: 'role', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/position/page.module').then((m) => m.Module) },
                { path: 'subdepartment', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/sup_department/page.module').then((m) => m.Module) },
                { path: 'role_permission', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n2_Organization/o4_Company/p5_role_permission/page.module').then((m) => m.Module) },
                { path: 'product_type', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p10_prodtut_type/page.module').then((m) => m.Module) },
                { path: 'expense_type', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o2_Vehicle_Frame/p11_expense_type/page.module').then((m) => m.Module) },

            // o4 Location
            { path: 'provinces', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o4_Location/p1_Provinces/page.module').then((m) => m.Module) },
            { path: 'districts', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o4_Location/p2_Districts/page.module').then((m) => m.Module) },
            { path: 'subdistricts', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o4_Location/p3_Subdistricts/page.module').then((m) => m.Module) },

            // m5 maintenance
            { path: 'st_bill_manage', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n1_Service/o1_bill_manage/page.module').then((m) => m.Module) },
                { path: 'st_part_storage', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n1_Service/o2_Spare_part/p1_part_storage/page.module').then((m) => m.Module) },
                { path: 'st_part_import', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n1_Service/o2_Spare_part/p2_part_import/page.module').then((m) => m.Module) },
                { path: 'st_part_export', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n1_Service/o2_Spare_part/p3_part_export/page.module').then((m) => m.Module) },
            { path: 'st_service_report', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n1_Service/o3_service_report/page.module').then((m) => m.Module) },

            { path: 'st_company', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n2_Frame/n1_company/page.module').then((m) => m.Module) },
            { path: 'st_group', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n2_Frame/n2_group/page.module').then((m) => m.Module) },
            { path: 'st_service', loadChildren: () => import('app/modules/admin/administrator/m5_Storage/n2_Frame/n3_serivce/page.module').then((m) => m.Module) },

            // mx AltMenu
            { path: 'history', loadChildren: () => import('app/modules/admin/administrator/mx_AltMenu/n1_history/page.module').then((m) => m.Module) },
            { path: 'document', loadChildren: () => import('app/modules/admin/bill/page.module').then((m) => m.Module) },
            { path: 'fix', loadChildren: () => import('app/modules/admin/fix/page.module').then((m) => m.Module) },
            { path: 'check-gas', loadChildren: () => import('app/modules/admin/check-gas/page.module').then((m) => m.Module) },
            { path: 'setting', loadChildren: () => import('app/modules/admin/administrator/m4_Frame/n1_Data/o3_Inspection/p6_setting/page.module').then((m) => m.Module) },

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then((m) => m.Error404Module), },
            { path: '**', redirectTo: '404-not-found' },


        ],
    },
];
