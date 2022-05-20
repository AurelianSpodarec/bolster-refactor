import { useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { useForm } from 'helpers/hooks';

import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from 'selectors/companyAdmin/companySubscription';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

import useSearch from 'hooks/useSearch';
import {
    PIN_OPTIONS_FILTERS_ALL,
    PIN_OPTIONS_SETS_FILTERS_CREATED_BY_OPTIONS,
    PIN_OPTIONS_FILTERS_ENABLED_DISABLED_OPTIONS,
    PIN_OPTIONS_SETS_FILTERS_OPTIONS,
    TOOLTIP_FILTERS_TYPES,
    PIN_OPTIONS_FILTERS_HIDDEN_OPTIONS,
} from 'constants/companyAdmin/enums';

const useFilterOptionSets = (sets, isSorting, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [expandedID, setExpandedID] = useState(null);

    const servicesArr = useSelector(selectServicesArr);
    const subscriptions = useSelector(selectSubscriptions);
    const company = useSelector(selectCompanySettings);

    const [form, handleChange] = useForm({
        [PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE]: [PIN_OPTIONS_FILTERS_ALL],
        [PIN_OPTIONS_SETS_FILTERS_OPTIONS.CREATED_BY]: PIN_OPTIONS_FILTERS_ALL,
        [PIN_OPTIONS_SETS_FILTERS_OPTIONS.ENABLED_DISABLED]: PIN_OPTIONS_FILTERS_ALL,
        [PIN_OPTIONS_SETS_FILTERS_OPTIONS.HIDDEN]: PIN_OPTIONS_FILTERS_ALL,
    });

    const filterOptions = [
        {
            id: PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE,
            name: 'Service',
            type: TOOLTIP_FILTERS_TYPES.MULTI_SELECTION,
            allowSearch: true,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                ...servicesArr
                    .filter(
                        service =>
                            !isEmpty(subscriptions.serviceIDs) &&
                            subscriptions.serviceIDs.includes(service.id),
                    )
                    .map(({ id, name }) => ({ id, name })),
            ],
        },
        {
            id: PIN_OPTIONS_SETS_FILTERS_OPTIONS.CREATED_BY,
            name: 'Created By',
            type: TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION,
            allowSearch: false,
            options: [
                { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
                {
                    id: PIN_OPTIONS_SETS_FILTERS_CREATED_BY_OPTIONS.COMPANY,
                    name: `${company?.name ? company.name : 'Company'} created`,
                },
                {
                    id: PIN_OPTIONS_SETS_FILTERS_CREATED_BY_OPTIONS.SUPER_ADMIN,
                    name: 'Bolster created',
                },
            ],
        },
        {
            id: PIN_OPTIONS_SETS_FILTERS_OPTIONS.ENABLED_DISABLED,
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
        // {
        //     id: PIN_OPTIONS_SETS_FILTERS_OPTIONS.HIDDEN,
        //     name: 'Hidden',
        //     type: TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION,
        //     allowSearch: false,
        //     options: [
        //         { id: PIN_OPTIONS_FILTERS_ALL, name: 'All' },
        //         {
        //             id: PIN_OPTIONS_FILTERS_HIDDEN_OPTIONS.HIDDEN,
        //             name: 'Hidden',
        //         },
        //     ],
        // },
    ];

    const getSortedSets = () => {
        return [...sets].sort((a, b) => b.isDefault - a.isDefault || a.name.localeCompare(b.name));
    };

    const getFilteredSets = () => {
        const sortedSets = getSortedSets();

        const typeFilters = sortedSets.filter(set => set.pinOptionTypeID === selectedTypeID);

        if (isSorting) return typeFilters;

        const initialFilters = typeFilters.filter(set => {
            if (!set.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (set.pinOptionTypeID !== selectedTypeID) return false;
            if (set.isDeleted) return false;
            return true;
        });

        const formFilters = initialFilters.filter(set => {
            const formServices = form[PIN_OPTIONS_SETS_FILTERS_OPTIONS.SERVICE];
            const formCreatedBy = form[PIN_OPTIONS_SETS_FILTERS_OPTIONS.CREATED_BY];
            const formEnabledDisabled = form[PIN_OPTIONS_SETS_FILTERS_OPTIONS.ENABLED_DISABLED];
            const formHidden = form[PIN_OPTIONS_SETS_FILTERS_OPTIONS.HIDDEN];

            if (
                formServices.length &&
                !formServices.includes(PIN_OPTIONS_FILTERS_ALL) &&
                !isEmpty(set.serviceIDs)
            ) {
                if (!formServices.some(id => set.serviceIDs.includes(id))) {
                    return false;
                }
            }

            if (formCreatedBy && !formCreatedBy !== PIN_OPTIONS_FILTERS_ALL) {
                if (
                    formCreatedBy === PIN_OPTIONS_SETS_FILTERS_CREATED_BY_OPTIONS.COMPANY &&
                    !set.companyID
                ) {
                    return false;
                }

                if (
                    formCreatedBy === PIN_OPTIONS_SETS_FILTERS_CREATED_BY_OPTIONS.SUPER_ADMIN &&
                    set.companyID
                ) {
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

            if (formHidden && !formHidden !== PIN_OPTIONS_FILTERS_ALL) {
                if (formHidden === PIN_OPTIONS_FILTERS_HIDDEN_OPTIONS.HIDDEN && set.isHidden) {
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
