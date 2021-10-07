export const companyAdminSitesSort = {
    statusOptions: {
        active: { value: 'active', label: 'Active' },
        'read only': { value: 'read only', label: 'Read only' },
        archived: { value: 'archived', label: 'Archived' },
    },
    sortOptions: {
        descending: { value: 'descending', text: 'Date Added (desc)' },
        ascending: { value: 'ascending', text: 'Date Added (asc)' },
        default: { value: 'default', text: 'Custom' },
    },
};

export const clientSitesSort = {
    statusOptions: {
        active: { value: 'active', text: 'Active' },
        archived: { value: 'archived', text: 'Archived' },
    },
    sortOptions: {
        default: { value: 'default', text: 'Default' },
        ascending: { value: 'ascending', text: 'Date Added (asc)' },
        descending: { value: 'descending', text: 'Date Added (desc)' },
    },
};
