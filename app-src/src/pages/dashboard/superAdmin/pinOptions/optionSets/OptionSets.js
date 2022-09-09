import React from 'react';
import { useSelector } from 'react-redux';
import useFetchPinOptionSets from '../../hooks/useFetchPinOptionSets';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import { selectPinOptionType } from '../../../../../selectors/superAdmin/pinOptionTypes';

import { isEmpty } from 'helpers/generic';

import useOptionSetActions from './hooks/useOptionSetActions';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

import OptionSetsListItem from './OptionSetsListItem';
import TooltipFilters from 'components/shared/filters/TooltipFilters/TooltipFilters';
import TooltipFiltersItem from 'components/shared/filters/TooltipFilters/TooltipFiltersItem';

const OptionSets = ({ selectedTypeID }) => {
    const selectedPinOptionType = useSelector(state => selectPinOptionType(state, selectedTypeID));

    const { pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError } =
        useFetchPinOptionSets();

    const {
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
    } = useFilterOptionSets(pinOptionSetsArr, selectedTypeID);

    const { showAddModal, showEditModal, showDeleteModal, showDuplicateModal } =
        useOptionSetActions(selectedTypeID);

    const setLink = selectedPinOptionType.slug;

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                />

                <ButtonWrapper alignment="right">
                    <div>
                        <ActionButton
                            icon="filter"
                            iconOnly
                            source="secondary"
                            size="medium"
                            iconEqualSize
                            onClick={() => setShowFilters(!showFilters)}
                            extraClasses={showFilters ? 'active' : ''}
                        />

                        {showFilters && (
                            <TooltipFilters closeFilters={() => setShowFilters(false)}>
                                {filterOptions.map(option => (
                                    <TooltipFiltersItem
                                        key={option.id}
                                        option={option}
                                        expandedID={expandedID}
                                        setExpandedID={setExpandedID}
                                        onChange={handleChange}
                                        selected={form[option.id]}
                                    />
                                ))}
                            </TooltipFilters>
                        )}
                    </div>

                    <ActionButton
                        text="Add"
                        icon="plus"
                        ambient="positive"
                        size="medium"
                        onClick={showAddModal}
                    />
                </ButtonWrapper>
            </FilterRow>

            <Table
                headers={['Name', '']}
                hideHeaders
                noData={isEmpty(filteredSets)}
                noDataMessage="There is no data to display."
                isFetching={isFetchingPinOptionSets}
                error={pinOptionSetsFetchError}
            >
                {filteredSets.map(set => (
                    <OptionSetsListItem
                        key={set.id}
                        set={set}
                        setLink={setLink}
                        showEditModal={showEditModal}
                        showDeleteModal={showDeleteModal}
                        showDuplicateModal={showDuplicateModal}
                    />
                ))}
            </Table>
        </>
    );
};

export default OptionSets;
