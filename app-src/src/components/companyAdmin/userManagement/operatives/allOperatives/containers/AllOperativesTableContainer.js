import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllOperativesTable from '../presentational/AllOperativesTable';
import { CREATE_OPERATIVE } from 'constants/shared/modalTypes';

const AllOperativesTableContainer = ({ filteredUsers }) => {
    const { users, disabledUsers, isFetching, error, onMobile, postSuccess } = useSelector(
        mapStateToProps,
    );
    const dispatch = useDispatch();
    const prevProps = usePrevious({ postSuccess });

    const mergedUsers = users.concat(disabledUsers);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(fetchCompanyUsers());
            dispatch(hideModal());
        }
    }, [dispatch, postSuccess]);

    return (
        <AllOperativesTable
            headers={[
                'Name',
                'Email',
                'Phone Number',
                'Has linked device?',
                'Operative Code',
                'Last upsynced date',
                'Last detected unsynced data',
                'App Version',
                'Number of attached drawings',
                '',
            ]}
            users={filteredUsers(mergedUsers)}
            isFetching={isFetching}
            error={error}
            handleShowModal={() => dispatch(showModal(CREATE_OPERATIVE))}
            onMobile={onMobile}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { isFetching: isFetchingCompanySettings },
        companyUsersReducer: {
            isFetching: isFetchingActive,
            error: activeError,
            users,
            postSuccess,
        },
        inactiveCompanyUsersReducer: {
            disabled,
            isFetching: isFetchingInactive,
            error: inactiveError,
        },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    users: Object.values(users),
    disabledUsers: Object.values(disabled),
    isFetching: isFetchingActive || isFetchingInactive || isFetchingCompanySettings,
    error: activeError || inactiveError,
    onMobile,
    postSuccess,
});

export default AllOperativesTableContainer;
