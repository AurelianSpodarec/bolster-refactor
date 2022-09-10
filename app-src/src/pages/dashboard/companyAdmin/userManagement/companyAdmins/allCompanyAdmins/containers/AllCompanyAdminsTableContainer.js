import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import useIsAdminPlus from '../../../../../../../hooks/useIsAdminPlus';
import useBolsterPlus from '../../../../subscription/addOns/hooks/useBolsterPlus';
import { usePrevious } from '../../../../../../../helpers/hooks';
import { hideModal } from '../../../../../../../actions/shared/generic/modals/sync/hideModal';
import { selectCompanyUsersPostSuccess } from '../../../../../../../selectors/companyAdmin/companyUsers';

const AllCompanyAdminTableContainer = ({ filteredUsers }) => {
    const { users, disabledUsers, isFetching, error } = useSelector(mapStateToProps);
    const dispatch = useDispatch();

    const mergedUsers = users.concat(disabledUsers);
    const isAdminPlus = useIsAdminPlus();
    const { isBolsterPlusActivated } = useBolsterPlus();
    const postSuccess = useSelector(selectCompanyUsersPostSuccess);
    const prevProps = usePrevious({ postSuccess });
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess]);

    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(mergedUsers)}>
            <AllCompanyAdminsTable
                headers={[
                    'Name',
                    'Phone number',
                    'Last device used',
                    'Last upsynced date',
                    'App version',
                    'Drawing count',
                    '',
                ]}
                users={filteredUsers(mergedUsers)}
                isFetching={isFetching}
                error={error}
                handleShowModal={() => dispatch(showModal(CREATE_COMPANY_ADMIN))}
                isAdminPlus={isAdminPlus}
                isBolsterPlus={isBolsterPlusActivated}
            />
        </BlockContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { isFetching: isFetchingCompanySettings },
        companyUsersReducer: { users, isFetching: isFetchingActive, error: activeError },
        inactiveCompanyUsersReducer: {
            disabled,
            isFetching: isFetchingInactive,
            error: inactiveError,
        },
    },
}) => ({
    isFetching: isFetchingActive || isFetchingInactive || isFetchingCompanySettings,
    error: activeError || inactiveError,
    users: Object.values(users),
    disabledUsers: Object.values(disabled),
});

export default AllCompanyAdminTableContainer;
