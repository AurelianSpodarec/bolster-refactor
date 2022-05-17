import { useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { useForm } from 'helpers/hooks';

import { selectServicesArr } from 'selectors/superAdmin/services';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';

import useSearch from 'hooks/useSearch';
import { PIN_OPTIONS_FILTERS_ALL, TOOLTIP_FILTERS_TYPES } from 'constants/companyAdmin/enums';
import { SA_PIN_OPTIONS_SETS_FILTERS_OPTIONS } from 'constants/superAdmin/enums';

const useFilterOptionSets = (sets, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);

    const [form, handleChange] = useForm({
        [SA_PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE]: [PIN_OPTIONS_FILTERS_ALL],
    });

    const filterOptions = [
        {
            id: SA_PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE,
            name: 'Service',
            type: TOOLTIP_FILTERS_TYPES.MULTI_SELECTION,
            allowSearch: true,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                ...servicesArr.map(({ id, name }) => ({ id, name })),
            ],
        },
    ];

    const getSortedSets = () => {
        return [...sets].sort((a, b) => b.isDefault - a.isDefault || a.name.localeCompare(b.name));
    };

    const getFilteredSets = () => {
        const sortedSets = getSortedSets();

        const typeFilters = sortedSets.filter(set => set.pinOptionTypeID === selectedTypeID);

        const initialFilters = typeFilters.filter(set => {
            if (!set.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (set.pinOptionTypeID !== selectedTypeID) return false;
            if (set.isDeleted) return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[SA_PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE];

            if (
                formServices.length &&
                !formServices.includes(PIN_OPTIONS_FILTERS_ALL) &&
                !isEmpty(set.serviceIDs)
            ) {
                if (!formServices.some(id => set.serviceIDs.includes(id))) {
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

export default useFilterOptionSets;
