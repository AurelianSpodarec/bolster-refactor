import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterPrelims from './hooks/useFilterPrelims';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components/shared/filters/FilterRow';
import Table from 'components/shared/generic/tables/presentational/Table';

const data = [
    {
        id: 1,
        name: 'Prelim 1',
    },
    {
        id: 2,
        name: 'Prelim 2',
    },
    {
        id: 3,
        name: 'Prelim 3',
    },
];

const Prelims = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const filteredPrelims = useFilterPrelims(data, searchTerm);

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
                noData={isEmpty(filteredPrelims)}
                noDataMessage="There are no prelims to display."
                isFetching={false}
                error={null}
            >
                {filteredPrelims.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td></td>
                    </tr>
                ))}
            </Table>
        </>
    );
};

export default Prelims;
