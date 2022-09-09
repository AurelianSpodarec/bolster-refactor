import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as SortAscIcon } from 'assets/images/icons/sort-asc.svg';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionTypesArr } from 'selectors/companyAdmin/pinOptionTypes';
import { selectPinOptionSet } from 'selectors/companyAdmin/pinOptionSets';
import { selectJwtData } from 'selectors/shared/jwt';

import useFilterOptionValues from './hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';
import useOptionValueActions from './hooks/useOptionValueActions';
import useUpdateOptionValueSort from './hooks/useUpdateOptionValueSort';
import useShouldRedirectFromOptionValues from './hooks/useShouldRedirectFromOptionValues';

import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionValuesListItem from './OptionValuesListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import TooltipFilters from 'components/shared/filters/TooltipFilters/TooltipFilters';
import TooltipFiltersItem from 'components/shared/filters/TooltipFilters/TooltipFiltersItem';

const OptionValuesList = ({ forwardRef, hasFetched }) => {
    const { setID, type } = useParams();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const { companyID } = useSelector(selectJwtData);
    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const typeID = specificType ? specificType.id : null;

    const parentSet = useSelector(state => selectPinOptionSet(state, setID));
    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

    const { isSorting, handleToggleSort, handleUpdateSort, moveItem } =
        useUpdateOptionValueSort(pinOptionsForSet);

    const {
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
    } = useFilterOptionValues(pinOptionsForSet, isSorting, parentSet);

    const {
        showAddModal,
        showEditModal,
        showDeleteModal,
        showDuplicateModal,
        showMoveModal,
        enableOptionValue,
        disableOptionValue,
    } = useOptionValueActions(typeID, setID);

    const shouldRedirect = useShouldRedirectFromOptionValues(hasFetched);

    const isCompanySet = !isEmpty(parentSet) && parentSet.companyID === companyID;

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    const columnWidths = ['100%'];

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                    disabled={isSorting}
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

                    {isCompanySet && (
                        <>
                            <ActionButton
                                svgIconComponent={SortAscIcon}
                                iconOnly
                                source={isSorting ? 'primary' : 'secondary'}
                                size="medium"
                                onClick={handleToggleSort}
                            />

                            <ActionButton
                                text="Add"
                                icon="plus"
                                ambient="positive"
                                size="medium"
                                onClick={showAddModal}
                                disabled={isSorting}
                            />
                        </>
                    )}
                </ButtonWrapper>
            </FilterRow>

            <Table
                headers={['Name', '']}
                hideHeaders
                noData={isEmpty(filteredOptionValues)}
                noDataMessage="There is no data to display."
                isFetching={false}
                error={null}
                withoutTBody
                extraClasses={isSorting ? 'dragging' : ''}
                tableColumnWidths={columnWidths}
            >
                <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
                    {filteredOptionValues.map((option, index) => (
                        <OptionValuesListItem
                            key={option.id}
                            index={index}
                            option={option}
                            setID={setID}
                            typeID={typeID}
                            showEditModal={showEditModal}
                            showDeleteModal={showDeleteModal}
                            showDuplicateModal={showDuplicateModal}
                            showMoveModal={showMoveModal}
                            enableOptionValue={enableOptionValue}
                            disableOptionValue={disableOptionValue}
                            isSorting={isSorting}
                            onMove={moveItem}
                            onDrop={handleUpdateSort}
                            tableColumnWidths={columnWidths}
                        />
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default withDropZone(OptionValuesList, 'PIN_OPTION_VALUES');
