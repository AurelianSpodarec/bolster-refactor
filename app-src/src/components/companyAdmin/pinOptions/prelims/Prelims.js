import React from 'react';

import { isEmpty } from 'helpers/generic';
import useSearch from 'hooks/useSearch';
import useFilterPrelims from './hooks/useFilterPrelims';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components/shared/filters/FilterRow';
import Table from 'components/shared/generic/tables/presentational/Table';
import useFetchPrelims from './hooks/useFetchPrelims';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import PrelimsListItem from './PrelimsListItem';
import usePrelimsSetActions from './hooks/usePrelimsSetActions';

const Prelims = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const { allPrelims, isFetchingPrelims, prelimsError } = useFetchPrelims();
    const filteredPrelims = useFilterPrelims(allPrelims, searchTerm);
    const { showAddModal, showEditModal, showDeleteModal } = usePrelimsSetActions();

    return (
        <>
            <FilterRow>
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                />

                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Add"
                        icon="plus"
                        ambient="positive"
                        size="medium"
                        onClick={showAddModal}
                    />
                </ButtonWrapper>
            </FilterRow>

            <Table
                headers={['Name', 'Type', 'Amount', '']}
                noData={isEmpty(filteredPrelims)}
                noDataMessage="There are no prelims to display."
                isFetching={isFetchingPrelims}
                error={prelimsError}
            >
                {filteredPrelims.map(set => (
                    <PrelimsListItem
                        key={set.id}
                        set={set}
                        showEditModal={showEditModal}
                        showDeleteModal={showDeleteModal}
                    />
                ))}
            </Table>
        </>
    );
};

export default Prelims;
