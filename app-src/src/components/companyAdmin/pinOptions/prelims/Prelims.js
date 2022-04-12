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
import {
    CREATE_PRELIM_MODAL,
    DELETE_PRELIM_MODAL,
    EDIT_PRELIM_MODAL,
} from 'constants/shared/modalTypes';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import PrelimsListItem from './PrelimsListItem';

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
                headers={['Name', 'Type', 'Value', '']}
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

    function showAddModal() {
        dispatch(showModal(CREATE_PRELIM_MODAL));
    }

    function showDeleteModal() {
        dispatch(showModal(DELETE_PRELIM_MODAL));
    }

    function showEditModal(set) {
        dispatch(showModal(EDIT_PRELIM_MODAL, { set }));
    }
};

export default Prelims;
