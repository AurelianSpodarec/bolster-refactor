import React from 'react';
import { useDispatch } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECOVER_USER } from 'constants/shared/modalTypes';

const DeletedCompanyAdminsListItem = ({
    user,
    user: { userFirstName, userLastName, userEmail },
}) => {
    const dispatch = useDispatch();

    return (
        <tr>
            <td>{`${userFirstName} ${userLastName}`}</td>
            <td>{userEmail}</td>
            <td>
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

export default DeletedCompanyAdminsListItem;
