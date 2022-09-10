import React from 'react';

import useSearch from 'hooks/useSearch';
import useFilterPrelims from './hooks/useFilterPrelims';
import useFetchPrelims from './hooks/useFetchPrelims';
import usePrelimsSetActions from './hooks/usePrelimsSetActions';
import useIsAdminPlus from '../../../../../hooks/useIsAdminPlus';

import { isEmpty } from 'helpers/generic';

import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import FilterRow from 'components_DEPRECATED/shared/filters/FilterRow';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import PrelimsListItem from './PrelimsListItem';
import TooltipContainer from 'components_DEPRECATED/shared/generic/tooltip/containers/TooltipContainer';

const Prelims = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const { allPrelims, isFetchingPrelims, prelimsError } = useFetchPrelims();
    const filteredPrelims = useFilterPrelims(allPrelims, searchTerm);
    const { showAddModal, showEditModal, showDeleteModal } = usePrelimsSetActions();
    const isAdminPlus = useIsAdminPlus();

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
                    <TooltipContainer
                        text="Creating prelims is only available to admin plus members."
                        shouldOutput={!isAdminPlus}
                        side="left"
                    >
                        <ActionButton
                            text="Add"
                            icon="plus"
                            ambient="positive"
                            size="medium"
                            onClick={showAddModal}
                            disabled={!isAdminPlus}
                        />
                    </TooltipContainer>
                </ButtonWrapper>
            </FilterRow>

            <Table
                headers={['Name', 'Type', 'Amount', '']}
                noData={isEmpty(filteredPrelims)}
                noDataMessage="There are no prelims to display."
                isFetching={isFetchingPrelims}
                error={prelimsError}
            >
                {filteredPrelims
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(set => (
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
