import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nameSort } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllOperativesTable from '../presentational/AllOperativesTable';
import { CREATE_OPERATIVE } from 'constants/shared/modalTypes';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const { OPERATIVE } = COMPANY_USER_ROLE_TYPES;

const AllOperativesTableContainer = () => {
    const { users, isFetching, error, onMobile, postSuccess } = useSelector(mapStateToProps);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const prevProps = usePrevious({ postSuccess });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(fetchCompanyUsers());
            dispatch(hideModal());
        }
    }, [dispatch, postSuccess]);

    const searchTermLower = searchTerm.toLowerCase();
    const filteredUsers = users.filter(user => {
        const name = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
        return (
            !searchTermLower ||
            name.includes(searchTermLower) ||
            user.userEmail.includes(searchTermLower)
        );
    });
    const sortedUsers = filteredUsers.sort(nameSort);
    return (
        <AllOperativesTable
            searchTerm={searchTerm}
            handleChange={handleChange}
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
            users={sortedUsers}
            isFetching={isFetching}
            error={error}
            handleShowModal={() => dispatch(showModal(CREATE_OPERATIVE))}
            onMobile={onMobile}
        />
    );

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { isFetching, error, users, postSuccess },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    users: Object.values(users).filter(({ type }) => type === OPERATIVE),
    isFetching,
    error,
    onMobile,
    postSuccess,
});

export default AllOperativesTableContainer;
