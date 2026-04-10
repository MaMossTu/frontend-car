import { FuseNavigationItem } from '@fuse/components/navigation';

// Instead of reading once at load time, create a function to get the current permissions
const getRolePermission = () => {
    try {
        return (
            JSON.parse(localStorage.getItem('role')) || { menu_permissions: [] }
        );
    } catch (e) {
        console.error('Error parsing role permissions:', e);
        return { menu_permissions: [] };
    }
};

// Helper function to check menu permission
const hasMenuPermission = (menuKey) => {
    const rolePermission = getRolePermission();
    const menu = rolePermission?.menu_permissions?.find(
        (e) => e.menu.key === menuKey
    );
    return menu?.view !== 0;
};

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'main',
        title: 'สร้างบิล',
        type: 'basic',
        icon: 'heroicons_outline:plus-circle',
        link: '/bill_create/list',
        hidden: () => !hasMenuPermission('menu1'),
    },
    // รายการ
    {
        id: 'list',
        title: 'รายการ',
        subtitle: 'แสดงรายการสำหรับผู้ใช้',
        type: 'group',
        icon: 'heroicons_outline:home',
        hidden: function () {
            return this.children.every((child) => child.hidden());
        },
        children: [
            {
                title: 'บริการลูกค้า',
                type: 'collapsable',
                icon: 'heroicons_outline:pencil-square',
                hidden: () => !hasMenuPermission('menu2'),
                children: [
                    {
                        title: 'จัดการบิล',
                        type: 'basic',
                        link: '/bill_manage/list',
                    },
                    {
                        title: 'เตือนต่ออายุ',
                        type: 'basic',
                        link: '/renewal_reminder/list',
                    },
                ],
            },
            {
                title: 'ลูกค้า',
                type: 'collapsable',
                icon: 'heroicons_outline:users',
                hidden: () => !hasMenuPermission('menu3'),
                children: [
                    {
                        title: 'ข้อมูลรถ  ',
                        type: 'basic',
                        link: '/customer_car/list',
                    },
                    {
                        title: 'ข้อมูลลูกค้า ',
                        type: 'basic',
                        link: '/customer_data/list',
                    },
                ],
            },
            {
                title: 'จัดการงาน',
                type: 'collapsable',
                icon: 'heroicons_outline:inbox-stack',
                hidden: () => !hasMenuPermission('menu4'),
                children: [
                    {
                        title: 'ตรวจสภาพรถ',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/vehicle_check/list',
                    },
                    {
                        title: 'ภาษีรถ',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/car_taxManage/list',
                    },
                    {
                        title: 'ตรวจแก๊ส',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/check-gas/list',
                    },
                    {
                        title: 'พ.ร.บ.',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/actManage/list',
                    },
                    {
                        title: 'ประกัน',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/insuranceManage/list',
                    },
                    {
                        title: 'Ems',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/emsManage/list',
                    },
                ],
            },
            {
                title: 'สต็อกเอกสาร',
                type: 'collapsable',
                icon: 'heroicons_outline:inbox-stack',
                hidden: () => !hasMenuPermission('menu5'),
                children: [
                    {
                        title: 'เอกสาร',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/doc/list',
                    },

                    {
                        title: 'เอกสาร/ลูกค้า',
                        type: 'collapsable',
                        icon: 'heroicons_outline:document-text',
                        children: [
                            {
                                title: 'ประวัติเอกสาร',
                                type: 'basic',
                                icon: 'heroicons_outline:inbox-stack',
                                link: '/doc_history/list',
                            },
                            {
                                title: 'สต๊อกเอกสาร',
                                type: 'basic',
                                icon: 'heroicons_outline:document-text',
                                link: '/doc_customer/list'
                            },
                        ]
                    },
                    {
                        title: 'เอกสารสาขา',
                        type: 'collapsable',
                        icon: 'heroicons_outline:inbox-stack',
                        children: [
                            {
                                title: 'ประวัติเอกสาร',
                                type: 'basic',
                                icon: 'heroicons_outline:inbox-stack',
                                link: '/doc_history_branch/list',
                            },
                            {
                                title: 'สต๊อกเอกสาร',
                                type: 'basic',
                                icon: 'heroicons_outline:document-text',
                                link: '/doc_report_branch/list',
                            },
                        ]
                    },

                ],
            },
        ],
    },
    // บัญชี
    {
        id: 'account',
        title: 'บัญชี',
        subtitle: 'แสดงบัญชีสำหรับผู้ใช้',
        type: 'group',
        icon: 'heroicons_outline:home',
        hidden: function () {
            return this.children.every((child) => child.hidden());
        },
        children: [
            {
                title: 'ลูกหนี้',
                type: 'collapsable',
                icon: 'heroicons_outline:receipt-percent',
                hidden: () => !hasMenuPermission('menu6'),
                children: [
                    {
                        title: 'รายการหนี้',
                        type: 'basic',
                        link: '/invoice/list',
                    },
                ],
            },
            {
                title: 'จัดการเอกสาร',
                type: 'collapsable',
                icon: 'heroicons_outline:plus-circle',
                hidden: () => !hasMenuPermission('menu7'),
                children: [
                    {
                        title: 'ใบเสนอราคา',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: 'document/list/quotation',
                    },
                    {
                        title: 'ใบแจ้งหนี้',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: 'document/list/invoice',
                    },
                    {
                        title: 'ใบวางบิล',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: 'document/list/billing',
                    },
                    {
                        title: 'ใบกำกับภาษี',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: 'document/list/taxinvoice',
                    },
                ],
            },
            {
                title: 'คอมมิชชัน',
                type: 'collapsable',
                icon: 'heroicons_outline:receipt-percent',
                hidden: () => !hasMenuPermission('menu8'),
                children: [
                    {
                        title: 'คอมมิชชัน (พนักงาน)',
                        type: 'basic',
                        link: '/commission/list',
                    },
                ],
            },
            {
                title: 'รายรับ-รายจ่าย',
                type: 'basic',
                link: '/expenses/list',
                icon: 'heroicons_outline:document-currency-dollar',
                hidden: () => !hasMenuPermission('menu9'),

            },
            {
                title: 'ประเภทรายรับ-รายจ่าย',
                type: 'basic',
                link: '/expense_type/list',
                icon: 'heroicons_outline:folder-open',
                hidden: () => !hasMenuPermission('menu9'),

            },
            // {
            //     title: 'รายงานประจำวัน',
            //     type: 'basic',
            //     icon: 'heroicons_outline:document-text',
            //     link: '/daily_report/list',
            //     hidden: () => !hasMenuPermission('menu10'),
            // },
            {
                title: 'สรุปค่าใช้จ่าย',
                type: 'collapsable',
                icon: 'heroicons_outline:document-text',
                hidden: () => !hasMenuPermission('menu17'),
                children: [
                    {
                        title: 'รายงานประจำวัน',
                        type: 'basic',
                        link: '/daily_report/list',
                    },
                    {
                        title: 'รายงานบริการ',
                        type: 'basic',
                        link: '/daily_service_report/list',
                    },
                ],
            },
        ],
    },
    // งานซ่อมบำรุง
    {
        id: 'fix',
        title: 'งานซ่อมบำรุง',
        subtitle: 'งานซ่อมบำรุง',
        type: 'group',
        icon: 'heroicons_outline:home',
        hidden: function () {
            return this.children.every((child) => child.hidden());
        },
        children: [
            {
                title: 'งานซ่อม',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: 'fix/list',
                hidden: () => !hasMenuPermission('menu11'),
            },
            {
                title: 'อะไหล่',
                type: 'collapsable',
                icon: 'heroicons_outline:inbox-stack',
                hidden: () => !hasMenuPermission('menu12'),
                children: [
                    {
                        title: 'คลังอะไหล่',
                        type: 'basic',
                        link: '/st_part_storage/list',
                    },
                    {
                        title: 'รายการรับเข้า',
                        type: 'basic',
                        link: '/st_part_import/list/deposit',
                    },
                    {
                        title: 'รายการเบิกออกอะไหล่',
                        type: 'basic',
                        link: '/st_part_import/list/withdraw',
                    },
                    {
                        title: 'ประเภทอะไหล่',
                        type: 'basic',
                        link: '/product_type/list',
                    },
                ],
            },
            {
                title: 'รายงาน',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/st_service_report/list',
                hidden: () => !hasMenuPermission('menu13'),
            },
        ],
    },
    // โครงสร้าง
    {
        id: 'structure',
        title: 'โครงสร้าง',
        subtitle: 'แสดงฐานข้อมูลสำหรับผู้ใช้',
        type: 'group',
        icon: 'heroicons_outline:home',
        hidden: function () {
            return this.children.every((child) => child.hidden());
        },
        children: [
            {
                title: 'โครงสร้างข้อมูล',
                type: 'collapsable',
                icon: 'heroicons_outline:folder-open',
                hidden: () => !hasMenuPermission('menu14'),
                children: [
                    {
                        title: 'ตั้งค่าบริการ ',
                        type: 'basic',
                        link: '/car_tax/list',
                    },
                    {
                        title: 'เงื่อนไขค่าบริการ',
                        type: 'basic',
                        link: '/setting/list',
                    },
                    {
                        title: 'ข้อมูลรถ',
                        type: 'collapsable',
                        icon: 'heroicons_outline:folder-open',
                        children: [
                            {
                                title: 'ยี่ห้อรถ',
                                type: 'basic',
                                link: '/brands/list',
                            },
                            {
                                title: 'รุ่นรถ',
                                type: 'basic',
                                link: '/models/list',
                            },
                            {
                                title: 'ยี่ห้อแก๊ส',
                                type: 'basic',
                                link: '/gasbrands/list',
                            },
                        ],
                    },
                    {
                        title: 'ข้อมูล พ.ร.บ.',
                        type: 'collapsable',
                        icon: 'heroicons_outline:folder-open',
                        children: [
                            {
                                title: 'ประเภท พ.ร.บ. รถ ',
                                type: 'basic',
                                link: '/inspectiontypes/list',
                            },
                            {
                                title: 'พ.ร.บ. ย่อย',
                                type: 'basic',
                                link: '/InsuranceTypes/list',
                            },
                            {
                                title: 'รายชื่อประกัน',
                                type: 'basic',
                                link: '/insurance/list',
                            },
                            {
                                title: 'ระดับประกันภัย',
                                type: 'basic',
                                link: '/insurrenewTypes/list',
                            },
                        ],
                    },
                    {
                        title: 'ข้อมูลพื้นที่',
                        type: 'collapsable',
                        icon: 'heroicons_outline:map',
                        children: [
                            {
                                title: 'จังหวัด',
                                type: 'basic',
                                link: '/provinces/list',
                            },
                            {
                                title: 'อำเภอ / เขต',
                                type: 'basic',
                                link: '/districts/list',
                            },
                            {
                                title: 'ตำบล / แขวง',
                                type: 'basic',
                                link: '/subdistricts/list',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'โครงสร้างองค์กร',
                type: 'collapsable',
                icon: 'heroicons_outline:folder-open',
                hidden: () => !hasMenuPermission('menu15'),
                children: [
                    {
                        title: 'ข้อมูลผู้ใช้งาน',
                        type: 'basic',
                        icon: 'heroicons_outline:user-circle',
                        link: '/user/list',
                    },
                    {
                        title: 'ข้อมูลพนักงาน',
                        type: 'basic',
                        icon: 'heroicons_outline:document-text',
                        link: '/employee/list',
                    },
                    {
                        title: 'ข้อมูลบริษัท',
                        type: 'collapsable',
                        icon: 'heroicons_outline:folder-open',
                        children: [
                            {
                                title: 'สาขา',
                                type: 'basic',
                                link: '/branch/list-branch',
                            },
                            {
                                title: 'ตำแหน่ง',
                                type: 'basic',
                                link: '/role/list',
                            },
                            {
                                title: 'แผนก',
                                type: 'basic',
                                link: '/department/list',
                            },
                            {
                                title: 'ฝ่าย',
                                type: 'basic',
                                link: '/subdepartment/list',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ออกจากระบบ
    {
        id: 'orter',
        title: 'เมนู',
        subtitle: 'เมนูสำหรับผู้ใช้',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                title: 'ประวัติการทำรายการ',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/history/list',
                hidden: () => !hasMenuPermission('menu16'),
            },
            {
                title: 'ออกจากระบบ',
                type: 'basic',
                icon: 'heroicons_outline:logout',
                link: '/sign-out',
            },
        ],
    },
];

interface NavigationConfig {
    id: string;
    title: string;
    icon?: string;
    type: 'aside' | 'group';
    tooltip?: string;
}

const commonNavigationItems: NavigationConfig[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        icon: 'heroicons_outline:home',
        type: 'group',
    },
    {
        id: 'apps',
        title: 'Apps',
        icon: 'heroicons_outline:qrcode',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        icon: 'heroicons_outline:document-duplicate',
        type: 'aside',
    },
    {
        id: 'user-interface',
        title: 'UI',
        icon: 'heroicons_outline:collection',
        type: 'aside',
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        icon: 'heroicons_outline:menu',
        type: 'aside',
    },
];

function createNavigation(configs: NavigationConfig[]): FuseNavigationItem[] {
    return configs.map(({ id, title, icon, type, tooltip }) => ({
        id,
        title: title.toUpperCase(),
        type,
        icon,
        tooltip,
        children: [], // Filled from defaultNavigation
    }));
}

export const compactNavigation = createNavigation(
    commonNavigationItems.map((item) => ({
        ...item,
        type: 'aside',
        title: item.title.toLowerCase(),
    }))
);

export const futuristicNavigation = createNavigation(commonNavigationItems);
export const horizontalNavigation = createNavigation(commonNavigationItems);
