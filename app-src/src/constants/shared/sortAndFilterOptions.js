export const companyAdminSitesSort = {
    statusOptions: {
        active: { value: 'active', text: 'Active' },
        'read only': { value: 'read only', text: 'Read only' },
        archived: { value: 'archived', text: 'Archived' }
    },
    sortOptions: {
        descending: { value: 'descending', text: 'Date Added (desc)' },
        ascending: { value: 'ascending', text: 'Date Added (asc)' },
        default: { value: 'default', text: 'Custom' },
    }
};

export const clientSitesSort = {
    statusOptions: {
        archived: { value: 'archived', text: 'Archived' }
    },
    sortOptions: {
        default: { value: 'default', text: 'Default' },
        ascending: { value: 'ascending', text: 'Date Added (asc)' },
        descending: { value: 'descending', text: 'Date Added (desc)' }
    }
};
