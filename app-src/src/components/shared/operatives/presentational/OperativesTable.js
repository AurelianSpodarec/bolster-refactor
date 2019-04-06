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
    handleShowModal,
    match
}) => {
    const tableHeaders = ['Name', 'Actions'];
    const { id } = match.params;
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
                    documentID={id}
                />
            </Table>
            <div className="button-container table">
                <Link
                    className={`button pull-right ${
                        isAddOperativeDisabled ? 'disabled-link' : ''
                    }`}
                    to={
                        isAddOperativeDisabled
                            ? `${location.pathname}`
                            : `${location.pathname}/add-operative`
                    }
                >
                    <i className="fal fa-plus" /> Invite operative
                </Link>
            </div>
        </div>
    );
};

export default withRouter(OperativesTable);
