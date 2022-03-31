import dashboardIcon from '../../_content/images/icons/nav/Dashboard.svg';
import sitesIcon from '../../_content/images/icons/nav/Sites.svg';
import usersIcon from '../../_content/images/icons/nav/Users.svg';
import ordersIcon from '../../_content/images/icons/nav/Orders.svg';
import reportsIcon from '../../_content/images/icons/nav/Reports.svg';
import settingsIcon from '../../_content/images/icons/nav/Settings.svg';
import toolsIcon from '../../_content/images/icons/nav/Tools.svg';
import supportIcon from '../../_content/images/icons/nav/Support-CompanyAdmin.svg';
import logoutIcon from '../../_content/images/icons/logout.png';
import companyIcon from '../../_content/images/icons/nav/Company.svg';
import selectCompanyIcon from '../../_content/images/icons/nav/SelectCompany.svg';

export const companyNavMenuItems = [
    {
        name: 'Dashboard',
        icon: dashboardIcon,
        link: '/company',
        showWhenNotSubscribed: false,
        paymentRestriction: false,
        clientAccessRestriction: false,
    },
    {
        name: 'Sites',
        icon: sitesIcon,
        link: '/company/sites',
        showWhenNotSubscribed: false,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [],
    },
    {
        name: 'Users',
        icon: usersIcon,
        link: null,
        showWhenNotSubscribed: false,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'Admins',
                link: '/company/users-management/company-admins',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Operatives',
                link: '/company/users-management/operatives',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Clients',
                link: '/company/users-management/clients',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Timesheets',
                link: '/company/users-management/timesheets',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Pin Tasks',
                link: '/company/users-management/pin-tasks',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
        ],
    },
    {
        name: 'Orders',
        icon: ordersIcon,
        link: null,
        showWhenNotSubscribed: true,
        paymentRestriction: true,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'Subscriptions & Credits',
                link: '/company/subscription',
                showWhenNotSubscribed: true,
                paymentRestriction: true,
                clientAccessRestriction: false,
            },
            {
                name: 'Orders',
                link: '/company/invoices',
                showWhenNotSubscribed: true,
                paymentRestriction: true,
                clientAccessRestriction: false,
            },
            {
                name: 'Drawing Credit Logs',
                link: '/company/tools/credit-logs',
                showWhenNotSubscribed: false,
                paymentRestriction: true,
                clientAccessRestriction: false,
            },
        ],
    },
    {
        name: 'Reports',
        icon: reportsIcon,
        link: null,
        showWhenNotSubscribed: false,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'My Company Reports',
                link: '/company/reports',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Create Report',
                link: '/company/tools/create-report',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
        ],
    },
    {
        name: 'Settings',
        icon: settingsIcon,
        link: null,
        showWhenNotSubscribed: true,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'Company Settings',
                link: '/company/settings',
                showWhenNotSubscribed: true,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'My Templates',
                link: '/company/tools/templates',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
        ],
    },
    {
        name: 'Tools',
        icon: toolsIcon,
        link: null,
        showWhenNotSubscribed: false,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'Bolster Approved Companies',
                link: '/company/approved-companies',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Company Documents',
                link: '/company/company-documents',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Upcoming Alerts',
                link: '/company/upcoming-alerts',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Activity Log',
                link: '/company/activity-log',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Generate QR Codes',
                link: '/company/generate-qr-codes',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Recently Deleted',
                link: '/company/recently-deleted',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
        ],
    },
    {
        name: 'Support',
        icon: supportIcon,
        link: null,
        showWhenNotSubscribed: true,
        paymentRestriction: false,
        clientAccessRestriction: false,
        subNavItems: [
            {
                name: 'User Guides',
                link: '/company/user-guides',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Release Notes',
                link: '/company/release-notes',
                showWhenNotSubscribed: true,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
            {
                name: 'Bug Report',
                link: '/company/bug-report',
                showWhenNotSubscribed: false,
                paymentRestriction: false,
                clientAccessRestriction: false,
            },
        ],
    },
];

export const companySelectList = [
    {
        name: 'My Profile',
        icon: companyIcon,
        link: '/company/profile',
    },
    {
        name: 'Select Company',
        icon: selectCompanyIcon,
        link: '/company/company-selection',
    },
    {
        name: 'Logout',
        icon: logoutIcon,
        link: null,
    },
];
