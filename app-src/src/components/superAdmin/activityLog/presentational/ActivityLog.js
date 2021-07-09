import React, { useEffect, useState } from 'react';

import { isEmpty } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';
import { useDispatch } from 'react-redux';
import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';

const typeOptions = [
    { label: 'Site', value: 'site' },
    { label: 'Building', value: 'building' },
    { label: 'Floor', value: 'floor' },
    { label: 'Drawing', value: 'drawing' },
    { label: 'Pin History', value: 'pin_history' },
    { label: 'User', value: 'user' },
    { label: 'Template', value: 'template' },
    { label: 'Client Access', value: 'client_access' },
    { label: 'Company Permission', value: 'company_permission' },
    { label: 'User Drawings', value: 'user_drawings' },
    { label: 'User Passwords', value: 'user_passwords' },
    { label: 'Operative Alert', value: 'operative_alert' },
    { label: 'Operative Permission', value: 'operative_permission' },
];

const ActivityLog = ({ logs, isFetching, error, headers }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(null);

    useEffect(() => {
        dispatch(fetchActivityLog(type));
    }, [type]);

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
                            <ActivityLogItem key={log.id} log={log} />
                        ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default ActivityLog;
