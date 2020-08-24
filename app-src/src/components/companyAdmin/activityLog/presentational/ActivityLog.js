import React from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';

const ActivityLog = ({ logs, isFetching, error }) => (
    <>
        <PageHeading title="Activity Log" withBackButton>
            <Link className="button yellow" to="/company/activity-log/edit-settings">
                <i className="far fa-pencil" />
                Edit Settings
            </Link>
        </PageHeading>

        <BlockContainer
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(logs)}
            heading="Activity Log"
        >
            <Table
                headers={['']}
                isFetching={isFetching}
                error={error}
                noData={!logs.length}
                noDataMessage="There are no activity logs to display."
            ></Table>
        </BlockContainer>
    </>
);

export default ActivityLog;
