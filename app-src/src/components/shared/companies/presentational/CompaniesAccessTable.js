import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import CompaniesAccessList from './CompaniesAccessList';

const CompaniesAccessTable = ({
    location,
    companies,
    parentId,
    handleShowModal,
    isFetching
}) => (
    <div className="size-lg-12">
        <Table
            headers={['Name', '', 'Actions']}
            isFetching={isFetching}
            noData={!companies.length}
            noDataMessage="There are no companies to display."
            withActions
        >
            <CompaniesAccessList
                handleShowModal={handleShowModal}
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

export default withRouter(CompaniesAccessTable);
