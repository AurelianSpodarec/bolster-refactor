import informationIcon from '../../_content/images/icons/nav/Information.svg';
import companyIcon from '../../_content/images/icons/nav/Company.svg';
import toolsIcon from '../../_content/images/icons/nav/Tools.svg';
import supportIcon from '../../_content/images/icons/nav/support-SuperAdmin.svg';
import systemIcon from '../../_content/images/icons/nav/System.svg';
import contactIcon from '../../_content/images/icons/nav/Contact.svg';

export const superAdminNavMenuItems = [
    {
        name: 'Information',
        icon: informationIcon,
        link: null,
        subNavItems: [
            { name: 'Company Reports', link: '/admin/company-reports' },
            { name: 'Company Tracking', link: '/admin/company-tracking' },
            { name: 'Company Timesheets', link: '/admin/company-timesheets' },
            { name: 'Drawing Upload Log', link: '/admin/drawing-upload-log' },
        ],
    },
    {
        name: 'Company',
        icon: companyIcon,
        link: null,
        subNavItems: [
            { name: 'Users', link: '/admin/users' },
            { name: 'User Creations', link: '/admin/user-creations' },
            { name: 'Companies', link: '/admin/companies' },
            { name: 'Invoices', link: '/admin/invoices' },
        ],
    },
    {
        name: 'Tools',
        icon: toolsIcon,
        link: null,
        subNavItems: [
            { name: 'Move Tool', link: '/admin/move-tool' },
            { name: 'Merge Tool', link: '/admin/merge-tool' },
            { name: 'Expiry Tool', link: '/admin/expiry-tool' },
            { name: 'Recently Extended Drawings', link: '/admin/recently-extended' },
        ],
    },
    {
        name: 'Support',
        icon: supportIcon,
        link: null,
        subNavItems: [
            { name: 'Bug Reports', link: '/admin/bug-reports' },
            { name: 'Operative Alerts', link: '/admin/operative-alerts' },
            { name: 'User Guides', link: '/admin/user-guides' },
            { name: 'Legal Documents', link: '/admin/legal-documents' },
            { name: 'FAQs', link: '/admin/faqs' },
            { name: 'Banner Notifications', link: '/admin/banners' },
        ],
    },
    {
        name: 'System',
        icon: systemIcon,
        link: null,
        subNavItems: [
            { name: 'Services', link: '/admin/services' },
            { name: 'Installation types', link: '/admin/installation-types' },
        ],
    },
    {
        name: 'Contact',
        icon: contactIcon,
        link: null,
        subNavItems: [
            { name: 'Contact Submissions', link: '/admin/contact-submissions' },
            { name: 'New Features', link: '/admin/new-features' },
            { name: 'Front End Text Settings', link: '/admin/text-settings' },
            { name: 'Front End Trusted By Settings', link: '/admin/trusted-by-settings' },
            { name: 'Demo Access Codes', link: '/admin/demo-access-codes' },
        ],
    },
];
