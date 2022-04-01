import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECOVER_USER } from 'constants/shared/modalTypes';
import moment from 'moment';
import fetchCompanyUsers from 'actions/superAdmin/users/async/fetchCompanyUsers';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../../shared/generic/button/presentational/ButtonWrapper';

const DeletedOperativesListItem = ({
    user,
    user: {
        userFirstName,
        userLastName,
        userEmail,
        userPhoneNumber,
        formattedOperativeCode,
        endedOn,
        endedByCompanyUserID,
    },
    headers,
}) => {
    const dispatch = useDispatch();
    const { onMobile, users } = useSelector(mapStateToProps);
    const deletedBy = users[endedByCompanyUserID] || {};

    useEffect(() => {
        if (user?.endedByCompanyUserID && !users[endedByCompanyUserID]) dispatch(fetchCompanyUsers);
    }, [dispatch, user.endedByCompanyUserID]);

    return (
        <tr>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {`${userFirstName} ${userLastName}`}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {userEmail}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {userPhoneNumber}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {formattedOperativeCode}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {endedOn ? moment(endedOn).format('DD/MM/YYYY') : '-'}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                {!!deletedBy.userFirstName && !!deletedBy.userLastName
                    ? `${deletedBy.userFirstName} ${deletedBy.userLastName}`
                    : '-'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}

                <ButtonWrapper alignment="right">
                    <ActionButton text="Recover" onClick={handleRecover} size="small" />
                </ButtonWrapper>
            </td>
        </tr>
    );

    function handleRecover() {
        dispatch(showModal(RECOVER_USER, { user }));
    }
};

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile },
    },
    companyAdmin: {
        companyUsersReducer: { users },
    },
}) => ({
    onMobile,
    users,
});

export default DeletedOperativesListItem;
