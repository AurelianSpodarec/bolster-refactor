import React from 'react';
import { useDispatch } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { REACTIVATE_USER } from 'constants/shared/modalTypes';

const InactiveOperativesListItem = ({
    user,
    user: { id, userFirstName, userLastName, userEmail },
}) => {
    const dispatch = useDispatch();

    return (
        <tr>
            <td>{`${userFirstName} ${userLastName}`}</td>
            <td>{userEmail}</td>
            <td>
                <button className="button blue" onClick={handleRequestReactivation}>
                    Reactivate
                </button>
            </td>
        </tr>
    );

    function handleRequestReactivation() {
        dispatch(showModal(REACTIVATE_USER, { user }));
    }
};

export default InactiveOperativesListItem;
