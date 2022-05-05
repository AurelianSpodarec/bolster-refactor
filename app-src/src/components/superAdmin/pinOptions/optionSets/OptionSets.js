import React from 'react';
import { useSelector } from 'react-redux';
import useFetchPinOptionSets from '../../hooks/useFetchPinOptionSets';
import useFilterOptionSets from 'hooks/useFilterOptionSets';

import { selectPinOptionType } from '../../../../selectors/superAdmin/pinOptionTypes';

import { isEmpty } from 'helpers/generic';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

import OptionSetsListItem from './OptionSetsListItem';
import useOptionSetActions from './hooks/useOptionSetActions';

const OptionSets = ({ selectedTypeID }) => {
    const selectedPinOptionType = useSelector(state => selectPinOptionType(state, selectedTypeID));

    const { pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError } =
        useFetchPinOptionSets();

    const { filteredSets, searchTerm, handleUpdateSearch } = useFilterOptionSets(
        pinOptionSetsArr,
        selectedTypeID,
    );

    const {
        showAddModal,
        showEditModal,
        // showDeleteModal, setAsDefault
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
                        // showDeleteModal={showDeleteModal}
                    />
                ))}
            </Table>
        </>
    );
};

export default OptionSets;
