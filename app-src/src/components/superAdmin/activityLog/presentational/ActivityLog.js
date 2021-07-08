import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';

const typeOptions = [
    { label: 'Site', value: 'Site' },
    { label: 'Building', value: 'Building' },
    { label: 'Floor', value: 'Floor' },
    { label: 'Drawing', value: 'Drawing' },
    { label: 'Pin History', value: 'Pin History' },
    { label: 'User', value: 'User' },
    { label: 'Operative Permission', value: 'Operative Permission' },
];

const ActivityLog = ({ logs, users, isFetching, error, headers }) => {
    const [type, setType] = useState(null);
    return (
        <>
            <PageHeading title="Activity Log" withBackButton />

            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(logs)}>
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
            </BlockContainer>
        </>
    );
};

export default ActivityLog;
