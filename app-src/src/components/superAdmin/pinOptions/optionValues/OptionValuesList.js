import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionTypesArr } from '../../../../selectors/superAdmin/pinOptionTypes';
import { selectPinOptionSet } from 'selectors/superAdmin/pinOptionSets';

import useFilterOptionValues from './hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';
import useOptionValueActions from './hooks/useOptionValueActions';
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
    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const typeID = specificType ? specificType.id : null;

    const parentSet = useSelector(state => selectPinOptionSet(state, setID));
    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

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
    } = useFilterOptionValues(pinOptionsForSet, parentSet);

    const { showAddModal, showEditModal, showDeleteModal } = useOptionValueActions(typeID, setID);

    const shouldRedirect = useShouldRedirectFromOptionValues(hasFetched);

    if (shouldRedirect) {
        return <Redirect to="/admin/pin-options" />;
    }

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
                noData={isEmpty(filteredOptionValues)}
                noDataMessage="There is no data to display."
                isFetching={false}
                error={null}
            >
                {filteredOptionValues.map((option, index) => (
                    <OptionValuesListItem
                        key={option.id}
                        index={index}
                        option={option}
                        setID={setID}
                        typeID={typeID}
                        showEditModal={showEditModal}
                        showDeleteModal={showDeleteModal}
                    />
                ))}
            </Table>
        </>
    );
};

export default OptionValuesList;
