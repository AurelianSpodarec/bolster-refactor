import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
    PIN_OPTIONS_FILTERS_ALL,
    PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS,
    PIN_OPTIONS_VALUES_FILTERS_OPTIONS,
} from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';

import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';

import useSearch from './useSearch';
import { isEmpty } from 'helpers/generic';

const useFilterOptionValues = (options, isSorting) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);
    const subscriptions = useSelector(selectSubscriptions);

    const [form, handleChange] = useForm({
        [PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE]: [PIN_OPTIONS_FILTERS_ALL],
        [PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED]: PIN_OPTIONS_FILTERS_ALL,
    });

    const filterOptions = [
        {
            id: PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE,
            name: 'Service',
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                ...servicesArr
                    .filter(service => subscriptions.serviceIDs.includes(service.id))
                    .map(({ id, name }) => ({ id, name })),
            ],
            isMultiSelection: true,
        },
        {
            id: PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED,
            name: 'Enabled / Disabled',
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                { id: PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.ENABLED, name: 'Enabled' },
                {
                    id: PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.DISABLED,
                    name: 'Disabled',
                },
            ],
            isMultiSelection: false,
        },
    ];

    const getFilteredOptionValues = () => {
        if (isSorting) return options;

        const initialFilters = options.filter(opt => {
            if (!opt.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (opt.isDeleted) return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE];
            const formEnabledDisabled = form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED];

            if (
                formServices.length &&
                !formServices.includes(PIN_OPTIONS_FILTERS_ALL) &&
                !isEmpty(set.serviceIDs)
            ) {
                if (!formServices.some(id => set.serviceIDs.includes(id))) {
                    return false;
                }
            }

            if (formEnabledDisabled && !formEnabledDisabled !== PIN_OPTIONS_FILTERS_ALL) {
                if (
                    formEnabledDisabled === PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.ENABLED &&
                    set.isDisabled
                ) {
                    return false;
                }

                if (
                    formEnabledDisabled === PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.DISABLED &&
                    !set.isDisabled
                ) {
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
