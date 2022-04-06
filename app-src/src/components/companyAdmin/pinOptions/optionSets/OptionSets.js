import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterOptionSets from './hooks/useFilterOptionSets';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';

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

const OptionSets = ({ selectedTypeID }) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredSets = useFilterOptionSets(data, searchTerm);

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
                noDataMessage="There is no data to display."
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

export default OptionSets;
