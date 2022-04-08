import React from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import useSearch from 'hooks/useSearch';
import useFilterPrelims from './hooks/useFilterPrelims';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components/shared/filters/FilterRow';
import Table from 'components/shared/generic/tables/presentational/Table';
import useFetchPrelims from './hooks/useFetchPrelims';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_PRELIM_MODAL } from 'constants/shared/modalTypes';

const Prelims = () => {
    const dispatch = useDispatch();

    const { searchTerm, handleUpdateSearch } = useSearch();
    const { allPrelims, isFetchingPrelims, prelimsError } = useFetchPrelims();
    const filteredPrelims = useFilterPrelims(allPrelims, searchTerm);

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
                headers={['Name', 'Type', 'Value', '']}
                noData={isEmpty(filteredPrelims)}
                noDataMessage="There are no prelims to display."
                isFetching={isFetchingPrelims}
                error={prelimsError}
            >
                {filteredPrelims.map(set => (
                    <tr key={set.id}>
                        <td>{set.name}</td>
                        <td>{set.type}</td>
                        <td>{set.value}</td>
                    </tr>
                ))}
            </Table>
        </>
    );

    function showAddModal() {
        dispatch(showModal(CREATE_PRELIM_MODAL));
    }
};

export default Prelims;
