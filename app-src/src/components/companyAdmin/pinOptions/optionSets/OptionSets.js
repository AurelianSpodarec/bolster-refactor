import React from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';
import { CREATE_PIN_OPTIONS_SET_MODAL } from 'constants/shared/modalTypes';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import useSearch from 'hooks/useSearch';
import useFetchPinOptionSets from 'components/companyAdmin/hooks/useFetchPinOptionSets';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionSetsListItem from './OptionSetsListItem';

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

                <button className="button green" onClick={showAddModal}>
                    Add
                </button>
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
                    <OptionSetsListItem key={set.id} set={set} setLink={setLink} />
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
};

export default OptionSets;
