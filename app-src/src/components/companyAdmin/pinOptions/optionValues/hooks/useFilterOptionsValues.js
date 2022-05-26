import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
    PIN_OPTIONS_FILTERS_ALL,
    PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS,
    PIN_OPTIONS_FILTERS_HIDDEN_NOT_HIDDEN_OPTIONS,
    PIN_OPTIONS_VALUES_FILTERS_OPTIONS,
    TOOLTIP_FILTERS_TYPES,
} from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';

import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';

import { isEmpty } from 'helpers/generic';
import useSearch from 'hooks/useSearch';

const useFilterOptionValues = (options, isSorting, set) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);
    const subscriptions = useSelector(selectSubscriptions);

    const [form, handleChange] = useForm({
        [PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE]: [PIN_OPTIONS_FILTERS_ALL],
        [PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED]: PIN_OPTIONS_FILTERS_ALL,
        [PIN_OPTIONS_VALUES_FILTERS_OPTIONS.HIDDEN_NOT_HIDDEN]: PIN_OPTIONS_FILTERS_ALL,
    });

    const filterOptions = [
        {
            id: PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE,
            name: 'Service',
            type: TOOLTIP_FILTERS_TYPES.MULTI_SELECTION,
            allowSearch: true,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                ...servicesArr
                    .filter(service => {
                        if (
                            isEmpty(subscriptions.serviceIDs) ||
                            !subscriptions.serviceIDs.includes(service.id)
                        ) {
                            return false;
                        }

                        if (!isEmpty(set.serviceIDs) && !set.serviceIDs.includes(service.id)) {
                            return false;
                        }

                        return true;
                    })
                    .map(({ id, name }) => ({ id, name })),
            ],
        },
        {
            id: PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED,
            name: 'Enabled / Disabled',
            type: TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION,
            allowSearch: false,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                { id: PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.ENABLED, name: 'Enabled' },
                {
                    id: PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS.DISABLED,
                    name: 'Disabled',
                },
            ],
        },
        {
            id: PIN_OPTIONS_VALUES_FILTERS_OPTIONS.HIDDEN_NOT_HIDDEN,
            name: 'Hidden / Not Hidden',
            type: TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION,
            allowSearch: false,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                {
                    id: PIN_OPTIONS_FILTERS_HIDDEN_NOT_HIDDEN_OPTIONS.NOT_HIDDEN,
                    name: 'Not Hidden',
                },
                {
                    id: PIN_OPTIONS_FILTERS_HIDDEN_NOT_HIDDEN_OPTIONS.HIDDEN,
                    name: 'Hidden',
                },
            ],
        },
    ];

    const getFilteredOptionValues = () => {
        if (isSorting) return options;

        const initialFilters = options.filter(opt => {
            if (!opt.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (opt.isDeleted) return false;
            if (
                opt.isHidden &&
                !!form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.HIDDEN_NOT_HIDDEN] &&
                form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.HIDDEN_NOT_HIDDEN] !== 2
            )
                return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.SERVICE];
            const formEnabledDisabled = form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.ENABLED_DISABLED];
            const formHiddenNotHidden = form[PIN_OPTIONS_VALUES_FILTERS_OPTIONS.HIDDEN_NOT_HIDDEN];

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

            if (formHiddenNotHidden && !formHiddenNotHidden !== PIN_OPTIONS_FILTERS_ALL) {
                if (
                    formHiddenNotHidden ===
                        PIN_OPTIONS_FILTERS_HIDDEN_NOT_HIDDEN_OPTIONS.NOT_HIDDEN &&
                    set.isHidden
                ) {
                    return false;
                }

                if (
                    formHiddenNotHidden === PIN_OPTIONS_FILTERS_HIDDEN_NOT_HIDDEN_OPTIONS.HIDDEN &&
                    !set.isHidden
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
