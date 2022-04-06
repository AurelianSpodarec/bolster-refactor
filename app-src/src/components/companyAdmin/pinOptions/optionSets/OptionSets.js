import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFetchPinOptionSets from 'components/companyAdmin/hooks/useFetchPinOptionSets';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';

const OptionSets = ({ selectedTypeID }) => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    const { pinOptionSets, isFetchingPinOptionSets, pinOptionSetsError } =
        useFetchPinOptionSets(selectedTypeID);

    const setsArray = Object.values(pinOptionSets);

    const filteredSets = useFilterOptionSets(setsArray, searchTerm, selectedTypeID);

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
                error={pinOptionSetsError}
            >
                {filteredSets.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td></td>
                    </tr>
                ))}
            </Table>
        </>
    );
};

export default OptionSets;
