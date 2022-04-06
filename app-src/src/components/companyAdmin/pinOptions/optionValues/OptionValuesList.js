import React from 'react';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterOptionValues from './hooks/useFilterOptionsValues';

import FilterRow from 'components/shared/filters/FilterRow';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesListItem from './OptionValuesListItem';

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

const OptionValuesList = () => {
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
};

export default OptionValuesList;
