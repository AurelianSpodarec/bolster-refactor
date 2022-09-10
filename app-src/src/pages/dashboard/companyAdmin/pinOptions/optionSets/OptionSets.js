import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';
import { selectJwtData } from 'selectors/shared/jwt';

import useFetchPinOptionSets from 'pages/dashboard/companyAdmin/hooks/useFetchPinOptionSets';

import useOptionSetActions from './hooks/useOptionSetActions';
import useFilterOptionSets from './hooks/useFilterOptionSets';
import useUpdateOptionSetSort from './hooks/useUpdateOptionSetSort';

import withDropZone from 'components_DEPRECATED/shared/dragDrop/hocs/withDropZone';

import FilterRow from 'components_DEPRECATED/shared/filters/FilterRow';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import OptionSetsListItem from './OptionSetsListItem';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import TooltipFilters from 'components_DEPRECATED/shared/filters/TooltipFilters/TooltipFilters';
import TooltipFiltersItem from 'components_DEPRECATED/shared/filters/TooltipFilters/TooltipFiltersItem';

const OptionSets = ({ forwardRef, selectedTypeID }) => {
    const selectedPinOptionType = useSelector(state => selectPinOptionType(state, selectedTypeID));
    const { companyID } = useSelector(selectJwtData);

    const { pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError } =
        useFetchPinOptionSets();

    const { isSorting, handleUpdateSort, moveItem } = useUpdateOptionSetSort(pinOptionSetsArr);

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
    } = useFilterOptionSets(pinOptionSetsArr, isSorting, selectedTypeID);

    const {
        showAddModal,
        showEditModal,
        showDeleteModal,
        showDuplicateModal,
        showMergeModal,
        enableOptionSet,
        disableOptionSet,
        setAsDefault,
        removeAsDefault,
    } = useOptionSetActions(selectedTypeID);

    const setLink = selectedPinOptionType.slug;

    const columnWidths = ['100%'];

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

                    {/* <ActionButton
                        svgIconComponent={SortAscIcon}
                        iconOnly
                        source={isSorting ? 'primary' : 'secondary'}
                        size="medium"
                        onClick={handleToggleSort}
                    /> */}

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
                withoutTBody
                extraClasses={isSorting ? 'dragging' : ''}
                tableColumnWidths={columnWidths}
            >
                <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
                    {filteredSets.map((set, index) => (
                        <OptionSetsListItem
                            key={set.id}
                            index={index}
                            set={set}
                            setLink={setLink}
                            showEditModal={showEditModal}
                            showDeleteModal={showDeleteModal}
                            showDuplicateModal={showDuplicateModal}
                            showMergeModal={showMergeModal}
                            enableOptionSet={enableOptionSet}
                            disableOptionSet={disableOptionSet}
                            setAsDefault={setAsDefault}
                            isSorting={isSorting}
                            onMove={moveItem}
                            onDrop={handleUpdateSort}
                            isCompanySet={set.companyID === companyID}
                            tableColumnWidths={columnWidths}
                            removeAsDefault={removeAsDefault}
                            parentType={selectedPinOptionType}
                        />
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default withDropZone(OptionSets, 'PIN_OPTION_SETS');
