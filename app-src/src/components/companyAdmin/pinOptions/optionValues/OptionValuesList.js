import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';
import { CREATE_PIN_OPTIONS_VALUE_MODAL } from 'constants/shared/modalTypes';
import { isEmpty } from 'helpers/generic';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import useSearch from 'hooks/useSearch';
import useFilterOptionValues from './hooks/useFilterOptionsValues';
import useGetOptionsForSet from './hooks/useGetOptionsForSet';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionValuesListItem from './OptionValuesListItem';

const OptionValuesList = () => {
    const dispatch = useDispatch();

    const { setID, type } = useParams();
    const typeID = PIN_OPTION_TYPES_LOOKUP[type];

    const pinOptionsForSet = useGetOptionsForSet(typeID, parseInt(setID));

    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredValues = useFilterOptionValues(pinOptionsForSet, searchTerm);

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
                noData={isEmpty(filteredValues)}
                noDataMessage="There is no data to display."
                isFetching={false}
                error={null}
            >
                {filteredValues.map(option => (
                    <OptionValuesListItem key={option.id} option={option} />
                ))}
            </Table>
        </>
    );

    function showAddModal() {
        dispatch(showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, { pinOptionTypeID: typeID }));
    }
};

export default OptionValuesList;
