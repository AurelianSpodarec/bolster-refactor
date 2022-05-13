import { useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { useForm } from 'helpers/hooks';

import { selectServicesArr } from 'selectors/companyAdmin/services';

import useSearch from 'hooks/useSearch';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';

const OPTIONS = {
    SERVICE: 1,
    CREATED_BY: 2,
    ENABLED_DISABLED: 3,
};

const CREATED_BY_OPTIONS = {
    COMPANY: 1,
    SUPER_ADMIN: 2,
};

const ENABLED_DISABLED_OPTIONS = {
    ENABLED: 1,
    DISABLED: 2,
};

const ALL = 0;

const useFilterSets = (sets, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);
    const subscriptions = useSelector(selectSubscriptions);

    const [form, handleChange] = useForm({
        [OPTIONS.SERVICE]: [ALL],
        [OPTIONS.CREATED_BY]: ALL,
        [OPTIONS.ENABLED_DISABLED]: ALL,
    });

    const filterOptions = [
        {
            id: OPTIONS.SERVICE,
            name: 'Service',
            options: [
                { id: ALL, name: 'All' },
                ...servicesArr
                    .filter(service => subscriptions.serviceIDs.includes(service.id))
                    .map(({ id, name }) => ({ id, name })),
            ],
            isMultiSelection: true,
        },
        {
            id: OPTIONS.CREATED_BY,
            name: 'Created By',
            options: [
                { id: ALL, name: 'All' },
                { id: CREATED_BY_OPTIONS.COMPANY, name: 'Company created' },
                { id: CREATED_BY_OPTIONS.SUPER_ADMIN, name: 'Bolster created' },
            ],
            isMultiSelection: false,
        },
        {
            id: OPTIONS.ENABLED_DISABLED,
            name: 'Enabled / Disabled',
            options: [
                { id: ALL, name: 'All' },
                { id: ENABLED_DISABLED_OPTIONS.ENABLED, name: 'Enabled' },
                { id: ENABLED_DISABLED_OPTIONS.DISABLED, name: 'Disabled' },
            ],
            isMultiSelection: false,
        },
    ];

    const getSortedSets = () => {
        return [...sets].sort((a, b) => b.isDefault - a.isDefault || a.name.localeCompare(b.name));
    };

    const getFilteredSets = () => {
        const sortedSets = getSortedSets();

        const initialFilters = sortedSets.filter(set => {
            if (!set.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (set.pinOptionTypeID !== selectedTypeID) return false;
            if (set.isDeleted) return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[OPTIONS.SERVICE];
            const formCreatedBy = form[OPTIONS.CREATED_BY];
            const formEnabledDisabled = form[OPTIONS.ENABLED_DISABLED];

            if (formServices.length && !formServices.includes(ALL) && !isEmpty(set.serviceIDs)) {
                if (!formServices.some(id => set.serviceIDs.includes(id))) {
                    return false;
                }
            }

            if (formCreatedBy && !formCreatedBy !== ALL) {
                if (formCreatedBy === CREATED_BY_OPTIONS.COMPANY && !set.companyID) {
                    return false;
                }

                if (formCreatedBy === CREATED_BY_OPTIONS.SUPER_ADMIN && set.companyID) {
                    return false;
                }
            }

            if (formEnabledDisabled && !formEnabledDisabled !== ALL) {
                if (formEnabledDisabled === ENABLED_DISABLED_OPTIONS.ENABLED && set.isDisabled) {
                    return false;
                }

                if (formEnabledDisabled === ENABLED_DISABLED_OPTIONS.DISABLED && !set.isDisabled) {
                    return false;
                }
            }

            return true;
        });

        return formFilters;
    };

    const filteredSets = getFilteredSets();

    return {
        filteredSets,
        searchTerm,
        handleUpdateSearch,
        showFilters,
        setShowFilters,
        expandedID,
        setExpandedID,
        filterOptions,
        form,
        handleChange,
    };
};

export default useFilterSets;
