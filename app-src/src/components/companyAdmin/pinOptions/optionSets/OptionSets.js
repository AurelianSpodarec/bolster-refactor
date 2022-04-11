import React from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';
import {
    CREATE_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
} from 'constants/shared/modalTypes';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import useSearch from 'hooks/useSearch';
import useFetchPinOptionSets from 'components/companyAdmin/hooks/useFetchPinOptionSets';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionSetsListItem from './OptionSetsListItem';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const OptionSets = ({ selectedTypeID }) => {
    const dispatch = useDispatch();

    const { searchTerm, handleUpdateSearch } = useSearch();

    const { pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError } =
        useFetchPinOptionSets();

    const filteredSets = useFilterOptionSets(pinOptionSetsArr, searchTerm, selectedTypeID);

    const setLink = PIN_OPTION_TYPES[selectedTypeID].link;

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
                    />
                ))}
            </Table>
        </>
    );

    function showAddModal() {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_SET_MODAL, {
                pinOptionTypeID: selectedTypeID,
            }),
        );
    }

    function showEditModal(set) {
        dispatch(showModal(EDIT_PIN_OPTIONS_SET_MODAL, { set }));
    }
};

export default OptionSets;
