import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFetchPinOptionSets from 'components/companyAdmin/hooks/useFetchPinOptionSets';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import OptionSetsListItem from './OptionSetsListItem';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

const OptionSets = ({ selectedTypeID }) => {
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

                <button className="button green">Add</button>
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
};

export default OptionSets;
