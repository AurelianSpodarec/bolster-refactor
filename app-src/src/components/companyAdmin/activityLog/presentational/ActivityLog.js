import React from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';

const ActivityLog = ({ logs, users, isOwner, isFetching, error, headers }) => (
    <>
        <PageHeading title="Activity Log" withBackButton>
            {isOwner && (
                <Link className="button yellow" to="/company/activity-log/edit-settings">
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            )}
        </PageHeading>

        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(logs)}>
            <BlockHeading title="Activity Log" />
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!logs.length}
                noDataMessage="There are no activity logs to display."
            >
                {[...logs]
                    .sort((a, b) => new Date(b.actionTakenDate) - new Date(a.actionTakenDate))
                    .map(log => (
                        <ActivityLogItem key={log.id} log={log} users={users} />
                    ))}
            </Table>
        </BlockContainer>
    </>
);

export default ActivityLog;
