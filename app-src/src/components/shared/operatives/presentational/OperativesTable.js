import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import OperativesList from './OperativesList';

const OperativesTable = ({ location, operatives, isFetching, error }) => {
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
            >
                <OperativesList operatives={operatives} />
            </Table>
            <Link
                className="button"
                to={`${location.pathname}/attach-operative`}
            >
                <i className="fal fa-plus" /> Invite operative
            </Link>
        </div>
    );
};

export default withRouter(OperativesTable);
