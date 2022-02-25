export const companyNavMenuItems = [
    { name: 'Dashboard', icon: 'far fa-home icon fa-fw', link: '/company' },
    {
        name: 'Sites',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'Sites', link: '/company/sites' },
            { name: 'Requests & Invites', link: '/company/tools/transfer-requests' },
            { name: 'Invited Access', link: '/client/companies' },
        ],
    },
    {
        name: 'Users',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'Admins', link: '/company/users-management/company-admins' },
            { name: 'Operatives', link: '/company/users-management/operatives' },
            { name: 'Clients', link: '/company/users-management/clients' },
            { name: 'Timesheets', link: '/company/users-management/timesheets' },
            { name: 'Pin Tasks', link: '/company/users-management/pin-tasks' },
        ],
    },
    {
        name: 'Orders',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'Orders', link: '/company/invoices' },
            { name: 'Subscriptions & Credits', link: '/company/subscription' },
        ],
    },
    {
        name: 'Reports',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'My Company Reports', link: '/company/reports' },
            { name: 'Create Report', link: '/company/create-report' },
        ],
    },
    {
        name: 'Settings',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'My Profile', link: '/company/profile' },
            { name: 'Company Settings', link: '/company/settings' },
            { name: 'My Templates', link: '/company/templates' },
        ],
    },
    {
        name: 'Tools',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'Release Notes', link: '/company/release-notes' },
            { name: 'Activity Log', link: '/company/activity-log' },
            { name: 'Generate QR Codes', link: '/company/generate-qr-codes' },
            { name: 'Company Documents', link: '/company/company-documents' },
            { name: 'Bug Report', link: '/company/bug-report' },
            { name: 'Bolster Approved Companies', link: '/company/approved-companies' },
            { name: 'Message Centre', link: '/company/message-centre' },
        ],
    },
    {
        name: 'Support',
        icon: '',
        link: null,
        subNavItems: [
            { name: 'User Guides', link: '/company/user-guides' },
            { name: 'Terms & Conditions', link: '/auth/terms' },
            { name: 'Select Company', link: '/company/company-selection' },
        ],
    },
];
