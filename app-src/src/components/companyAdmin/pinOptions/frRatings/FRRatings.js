import React from 'react';

import useSearch from 'hooks/useSearch';
import useFilterOptions from '../hooks/useFilterOptions';
import useFetchFRRatings from './hooks/useFetchFRRatings';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components/shared/filters/FilterRow';
import Table from 'components/shared/generic/tables/presentational/Table';
import { isEmpty } from 'helpers/generic';

const data = [
    {
        id: 1,
        name: 'Rating 1',
    },
    {
        id: 2,
        name: 'Rating 2',
    },
    {
        id: 3,
        name: 'Rating 3',
    },
];

const FRRatings = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredOptions = useFilterOptions(data, searchTerm);

    useFetchFRRatings();

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
                noData={isEmpty(filteredOptions)}
                noDataMessage="There are no fr ratings to display."
                isFetching={false}
                error={null}
            >
                {filteredOptions.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td></td>
                    </tr>
                ))}
            </Table>
        </>
    );
};

export default FRRatings;
