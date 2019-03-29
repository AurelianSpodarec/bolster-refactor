import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import CompaniesAccessList from './CompaniesAccessList';

const CompaniesAccess = ({
    location,
    companies,
    parentId,
    isFetching,
    isEmpty,
    error
}) => {
    if (isEmpty) {
        return <p>Loading...</p>;
    }

    return (
        <div className="size-lg-12">
            <h3 className="heading heading-3 size-lg-12">
                Companies with access
            </h3>
            <Table
                headers={['Name', 'Actions']}
                isFetching={isFetching}
                error={error}
                noData={!companies.length}
                noDataMessage="There are no companies to display."
                withActions
            >
                <CompaniesAccessList
                    companies={companies}
                    parentId={parentId}
                />
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
