import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterOptionValues from './hooks/useFilterOptionsValues';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';

const data = [
    {
        id: 1,
        name: 'Value 1',
    },
    {
        id: 2,
        name: 'Value 2',
    },
    {
        id: 3,
        name: 'Value 3',
    },
];

const OptionValues = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredValues = useFilterOptionValues(data, searchTerm);

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
                noData={isEmpty(filteredValues)}
                noDataMessage="There is no data to display."
                isFetching={false}
                error={null}
            >
                {filteredValues.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td></td>
                    </tr>
                ))}
            </Table>
        </>
    );
};

export default OptionValues;
