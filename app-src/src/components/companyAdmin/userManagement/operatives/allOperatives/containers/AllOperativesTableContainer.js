import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllOperativesTable from '../presentational/AllOperativesTable';
import { CREATE_OPERATIVE } from 'constants/shared/modalTypes';

const AllOperativesTableContainer = ({ filteredUsers }) => {
    const { users, isFetching, error, onMobile, postSuccess } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const prevProps = usePrevious({ postSuccess });

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
            users={filteredUsers(users)}
            isFetching={isFetching}
            error={error}
            handleShowModal={() => dispatch(showModal(CREATE_OPERATIVE))}
            onMobile={onMobile}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { isFetching, error, users, postSuccess },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    users: Object.values(users),
    isFetching,
    error,
    onMobile,
    postSuccess,
});

export default AllOperativesTableContainer;
