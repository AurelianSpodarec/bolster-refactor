import React, { useEffect, useState } from 'react';

import { isEmpty, titleCaseString, toTitleCase } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';
import { useDispatch } from 'react-redux';
import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';
import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';

const typeOptions = Object.keys(ACTIVITY_LOG_REFERENCE_TYPES).map(item => {
    return {
        label: titleCaseString(item),
        value: ACTIVITY_LOG_REFERENCE_TYPES[item],
    };
});

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
