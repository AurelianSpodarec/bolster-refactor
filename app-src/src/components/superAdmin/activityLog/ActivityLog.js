import React, { useEffect, useState } from 'react';

import { formatUnderscoreToTitleCase } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';
import { useDispatch, useSelector } from 'react-redux';
import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';
import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
} from 'selectors/superAdmin/activityLog';

const headers = ['Name', 'Reference Type', 'Action Type', 'Action By', 'Date'];

const typeOptions = Object.keys(ACTIVITY_LOG_REFERENCE_TYPES).map(item => {
    return {
        label: formatUnderscoreToTitleCase(item),
        value: ACTIVITY_LOG_REFERENCE_TYPES[item],
    };
});

const ActivityLog = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(null);

    const logs = useSelector(selectActivityLogArr);
    const isFetching = useSelector(selectActivityLogIsFetching);
    const error = useSelector(selectActivityLogError);

    useEffect(() => {
        dispatch(fetchActivityLog(type));
    }, [type]);

    return (
        <>
            <PageHeading title="Activity Log" withBackButton />

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
                            <ActivityLogItem key={log.id} log={log} />
                        ))}
                </Table>
            </Block>
        </>
    );
};

export default ActivityLog;
