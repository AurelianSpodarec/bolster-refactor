import { useState } from 'react';
import { useSelector } from 'react-redux';

import { PIN_OPTIONS_FILTERS_ALL, TOOLTIP_FILTERS_TYPES } from 'constants/companyAdmin/enums';
import { SA_PIN_OPTIONS_VALUES_FILTERS_OPTIONS } from 'constants/superAdmin/enums';
import { useForm } from 'helpers/hooks';
import { isEmpty } from 'helpers/generic';

import { selectServicesArr } from 'selectors/superAdmin/services';

import useSearch from 'hooks/useSearch';

const useFilterOptionValues = (options, set) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);

    const [form, handleChange] = useForm({
        [SA_PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE]: [PIN_OPTIONS_FILTERS_ALL],
    });

    const filterOptions = [
        {
            id: SA_PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE,
            name: 'Service',
            type: TOOLTIP_FILTERS_TYPES.MULTI_SELECTION,
            allowSearch: true,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                ...servicesArr
                    .filter(service => {
                        if (!isEmpty(set.serviceIDs) && !set.serviceIDs.includes(service.id)) {
                            return false;
                        }

                        return true;
                    })
                    .map(({ id, name }) => ({ id, name })),
            ],
        },
    ];

    const getFilteredOptionValues = () => {
        const initialFilters = options.filter(opt => {
            if (!opt.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (opt.isDeleted) return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[SA_PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE];

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

    const filteredOptionValues = getFilteredOptionValues();

    return {
        filteredOptionValues,
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

export default useFilterOptionValues;
