import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatUnderscoreToTitleCase } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActivityLogItem from './ActivityLogItem';
import Select from 'components/shared/generic/form/presentational/Select';
import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';
import { useDispatch, useSelector } from 'react-redux';
import {
    ACTIVITY_LOG_REFERENCE_TYPES,
    COMPANY_USER_ROLE_TYPES,
} from 'constants/companyAdmin/enums';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
} from 'selectors/companyAdmin/activityLog';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import { selectJWTData } from 'selectors/shared/decodeJWT';

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
    const isFetchingActivityLog = useSelector(selectActivityLogIsFetching);
    const activityLogError = useSelector(selectActivityLogError);

    const users = useSelector(selectCompanyUsers);
    const isFetchingCompanyUsers = useSelector(selectCompanyUsersIsFetching);
    const activityCompanyUsersError = useSelector(selectCompanyUsersFetchError);

    const { companyUserType } = useSelector(selectJWTData);

    const isFetching = isFetchingActivityLog || isFetchingCompanyUsers;
    const error = activityLogError || activityCompanyUsersError;

    const isOwner = companyUserType === COMPANY_USER_ROLE_TYPES.OWNER;

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchActivityLog(type));
    }, [dispatch, type]);

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
