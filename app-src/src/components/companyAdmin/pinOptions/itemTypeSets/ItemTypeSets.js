import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterSets from '../hooks/useFilterSets';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import FilterRow from 'components/shared/filters/FilterRow';

const data = [
    {
        id: 1,
        name: 'Set 1',
    },
    {
        id: 2,
        name: 'Set 2',
    },
    {
        id: 3,
        name: 'Set 3',
    },
];

const ItemTypeSets = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredSets = useFilterSets(data, searchTerm);

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
                noData={isEmpty(filteredSets)}
                noDataMessage="There are no installation sets to display."
                isFetching={false}
                error={null}
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

export default ItemTypeSets;
