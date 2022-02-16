import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import RecentlyDeletedList from './RecentlyDeletedList';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const RecentlyDeletedTable = ({
    headers,
    recentlyDeleted,
    isFetching,
    error,
    page,
    setPage,
    pageSize,
    searchTerm,
    setSearchTerm,
    type,
    setType,
    typeOptions,
}) => (
    <BlockContainer>
        <BlockHeading title="Deleted data">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyItems: 'center',
                    float: 'right',
                }}
            >
                <Select
                    value={type}
                    onChange={(_, value) => setType(value)}
                    placeholder="Filter by Type..."
                    options={typeOptions}
                />
                <TextInputContainer
                    value={searchTerm}
                    handleChange={(_, value) => setSearchTerm(value)}
                    placeholder="Enter Search term..."
                />
                {page > 1 && (
                    <ButtonContainer className="icon-only" handleClick={() => setPage(page - 1)}>
                        <i className="far fa-chevron-left" />
                    </ButtonContainer>
                )}
                <p style={{ margin: '0 1em' }}>Page {page}</p>
                {recentlyDeleted.length >= pageSize && (
                    <ButtonContainer className="icon-only" handleClick={() => setPage(page + 1)}>
                        <i className="far fa-chevron-right" />
                    </ButtonContainer>
                )}
            </div>
        </BlockHeading>
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!recentlyDeleted.length}
            noDataMessage="No recently deleted data to display."
            extraClasses="large"
        >
            <RecentlyDeletedList
                colCount={headers.length}
                recentlyDeleted={recentlyDeleted}
                headers={headers}
            />
        </Table>
    </BlockContainer>
);

export default RecentlyDeletedTable;
