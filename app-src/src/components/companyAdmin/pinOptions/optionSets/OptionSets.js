import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';
import { selectJwtData } from 'selectors/shared/jwt';

import useFetchPinOptionSets from 'components/companyAdmin/hooks/useFetchPinOptionSets';

import useOptionSetActions from './hooks/useOptionSetActions';
import useFilterOptionSets from 'hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionSetsListItem from './OptionSetsListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const OptionSets = ({ selectedTypeID }) => {
    const selectedPinOptionType = useSelector(state => selectPinOptionType(state, selectedTypeID));
    const { companyID } = useSelector(selectJwtData);

    const { pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError } =
        useFetchPinOptionSets();

    const { filteredSets, searchTerm, handleUpdateSearch } = useFilterOptionSets(
        pinOptionSetsArr,
        selectedTypeID,
    );

    const {
        showAddModal,
        showEditModal,
        showDeleteModal,
        enableOptionSet,
        disableOptionSet,
        setAsDefault,
    } = useOptionSetActions(selectedTypeID);

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
                    <ActionButton
                        icon="filter"
                        iconOnly
                        source="secondary"
                        size="medium"
                        iconEqualSize
                        onClick={() => console.log('open filters')}
                    />

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
                        enableOptionSet={enableOptionSet}
                        disableOptionSet={disableOptionSet}
                        setAsDefault={setAsDefault}
                        isCompanySet={set.companyID === companyID}
                    />
                ))}
            </Table>
        </>
    );
};

export default OptionSets;
