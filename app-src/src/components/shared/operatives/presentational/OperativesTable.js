import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';

const OperativesTable = ({
    location,
    operatives,
    isFetching,
    error,
    handleShowModal
}) => {
    const tableHeaders = ['Name', 'Actions'];

    return (
        <div className="size-lg-12">
            <h2 className="heading heading-3 size-lg-12">
                Operatives with access
            </h2>
            <Table
                headers={tableHeaders}
                isFetching={isFetching}
                error={error}
                noData={!operatives.length}
                noDataMessage="There are no operatives to display."
                withActions
            >
                <OperativesList
                    operatives={operatives}
                    handleShowModal={handleShowModal}
                />
            </Table>
            <div className="button-container table">
                <Link
                    className="button pull-right"
                    to={`${location.pathname}/add-operative`}
                >
                    <i className="fal fa-plus" /> Invite operative
                </Link>
            </div>
        </div>
    );
};

export default withRouter(OperativesTable);
