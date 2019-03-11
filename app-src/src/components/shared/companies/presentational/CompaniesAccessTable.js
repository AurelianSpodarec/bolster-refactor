import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import CompaniesAccessList from './CompaniesAccessList';

const CompaniesAccess = ({ location, companies, isFetching, error }) => {
    const tableHeaders = ['Name', 'Actions'];

    return (
        <div className="size-lg-12">
            <h2 className="heading heading-3 size-lg-12">
                Companies with access
            </h2>
            <Table
                headers={tableHeaders}
                isFetching={isFetching}
                error={error}
                noData={!companies.length}
                noDataMessage="There are no companies to display."
                withActions
            >
                <CompaniesAccessList companies={companies} />
            </Table>
            <div className="button-container table">
                <Link
                    className="button pull-right"
                    to={`${location.pathname}/invite-company`}
                >
                    <i className="fa fa-plus" /> Invite company
                </Link>
            </div>
        </div>
    );
};

export default withRouter(CompaniesAccess);
