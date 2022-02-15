import React from 'react';
import { Link } from 'react-router-dom';

import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';
import { formatUnderscoreToTitleCase } from 'helpers/generic';

import useFetchActivityLog from '../hooks/useFetchActivityLog';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';

const headers = ['Name', 'Reference Type', 'Action Type', 'Action By', 'Date'];

const typeOptions = Object.keys(ACTIVITY_LOG_REFERENCE_TYPES).map(item => {
    return {
        label: formatUnderscoreToTitleCase(item),
        value: ACTIVITY_LOG_REFERENCE_TYPES[item],
    };
});

const ActivityLog = () => {
    const { logs, users, isFetching, error, isOwner, type, setType } = useFetchActivityLog();

    return (
        <>
            <PageHeading title="Activity Log" withBackButton>
                {isOwner && (
                    <Link className="button yellow" to="/company/activity-log/edit-settings">
                        <i className="far fa-pencil" />
                        Edit Settings
                    </Link>
                )}
            </PageHeading>

            <Block>
                <BlockHeading title="Activity Log">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyItems: 'center',
                            float: 'right',
                        }}
                    >
                        <Select
                            value={type}
                            onChange={(_, value) => setType(value)}
                            placeholder="Filter by Type..."
                            options={typeOptions}
                        />
                    </div>
                </BlockHeading>
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
            </Block>
        </>
    );
};

export default ActivityLog;
