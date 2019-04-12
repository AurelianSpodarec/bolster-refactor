import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const OperativesTable = ({
    location,
    operatives,
    isFetching,
    isAddOperativeDisabled,
    error,
    handleDeleteOperativeModal,
    match
}) => {
    const { id } = match.params;
    return (
        <div className="size-lg-12">
            <BlockHeading title="Operative Access">
                <Link
                    className={`button pull-right ${
                        isAddOperativeDisabled ? 'disabled' : ''
                    }`}
                    to={
                        isAddOperativeDisabled
                            ? `${location.pathname}`
                            : `${location.pathname}/add-operative`
                    }
                >
                    <i className="fa fa-plus" />{' '}
                    {isAddOperativeDisabled ? 'Full' : 'Invite'}
                </Link>
            </BlockHeading>
            <Table
                headers={['Name', 'Actions']}
                isFetching={isFetching}
                error={error}
                noData={!operatives.length}
                noDataMessage="No operatives to display"
                withActions
            >
                <OperativesList
                    operatives={operatives}
                    handleDeleteOperativeModal={handleDeleteOperativeModal}
                    documentID={id}
                />
            </Table>
        </div>
    );
};

export default withRouter(OperativesTable);
