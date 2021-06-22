import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECOVER_USER } from 'constants/shared/modalTypes';

const DeletedCompanyAdminsListItem = ({
    user,
    user: { userFirstName, userLastName, userEmail, userPhoneNumber, formattedOperativeCode },
    headers,
}) => {
    const dispatch = useDispatch();
    const { onMobile } = useSelector(mapStateToProps);

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
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                <button className="button blue" onClick={handleRecover}>
                    Recover
                </button>
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
}) => ({
    onMobile,
});

export default DeletedCompanyAdminsListItem;
