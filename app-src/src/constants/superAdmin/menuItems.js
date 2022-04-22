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
        link: '/admin/company-reports',
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
        link: '/admin/users',
        subNavItems: [
            { name: 'Companies', link: '/admin/companies' },
            { name: 'Invoices', link: '/admin/invoices' },
            { name: 'Users', link: '/admin/users' },
            { name: 'User Creations', link: '/admin/user-creations' },
        ],
    },
    {
        name: 'Tools',
        icon: toolsIcon,
        link: '/admin/move-tool',
        subNavItems: [
            { name: 'Move Tool', link: '/admin/move-tool' },
            { name: 'Merge Tool', link: '/admin/merge-tool' },
            { name: 'Expiry Tool', link: '/admin/expiry-tool' },
            { name: 'Recently Extended Drawings', link: '/admin/recently-extended' },
            { name: 'Recently Deleted', link: '/admin/recently-deleted' },
            { name: 'Activity Log', link: '/admin/activity-logs' },
        ],
    },
    {
        name: 'Support',
        icon: supportIcon,
        link: '/admin/bug-reports',
        subNavItems: [
            { name: 'Bug Reports', link: '/admin/bug-reports' },
            { name: 'Operative Alerts', link: '/admin/operative-alerts' },
            { name: 'User Guides', link: '/admin/user-guides' },
            { name: 'Legal Documents', link: '/admin/legal-documents' },
            { name: 'FAQs', link: '/admin/faqs' },
        ],
    },
    {
        name: 'System',
        icon: systemIcon,
        link: '/admin/services',
        subNavItems: [
            { name: 'Services', link: '/admin/services' },
            { name: 'Pin Options', link: '/admin/pin-options' },
        ],
    },
    {
        name: 'Contact',
        icon: contactIcon,
        link: '/admin/contact-submissions',
        subNavItems: [
            { name: 'Contact Submissions', link: '/admin/contact-submissions' },
            { name: 'New Features', link: '/admin/new-features' },
            { name: 'Front End Text Settings', link: '/admin/text-settings' },
            { name: 'Front End Trusted By Settings', link: '/admin/trusted-by-settings' },
            { name: 'Demo Access Codes', link: '/admin/demo-access-codes' },
            { name: 'Banner Notifications', link: '/admin/banners' },
        ],
    },
];
