import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';

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
            <h2 className="heading heading-3 size-lg-12">
                Operatives with access
            </h2>
            <Table
                headers={['Name', 'Actions']}
                isFetching={isFetching}
                error={error}
                noData={!operatives.length}
                noDataMessage="There are no operatives to display."
                withActions
            >
                <OperativesList
                    operatives={operatives}
                    handleDeleteOperativeModal={handleDeleteOperativeModal}
                    documentID={id}
                />
            </Table>
            <div className="button-container table">
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
                    {isAddOperativeDisabled
                        ? 'Operatives full'
                        : 'Invite operative'}
                </Link>
            </div>
        </div>
    );
};

export default withRouter(OperativesTable);
