import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';
import Search from 'components/shared/generic/form/presentational/Search';

const AllOperativesTable = ({
    headers,
    users,
    isFetching,
    error,
    handleShowModal,
    onMobile,
    searchTerm,
    handleChange
}) => (
        <BlockContainer>
            <BlockHeading title="Operatives">
                <button className="button green" onClick={handleShowModal}>
                    <i className="fa fa-plus" /> Create Operative
            </button>
                <Search
                    value={searchTerm}
                    placeholder="search by name/email"
                    handleChange={handleChange}
                    name="searchTerm"
                />
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No operatives to display."
            >
                {users.map(user => (
                    <AllOperativesListItemContainer
                        headers={headers}
                        key={user.id}
                        user={user}
                        onMobile={onMobile}
                    />
                ))}
            </Table>
        </BlockContainer>
    );

export default AllOperativesTable;
