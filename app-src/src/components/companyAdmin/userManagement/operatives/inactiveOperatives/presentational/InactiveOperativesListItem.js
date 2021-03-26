import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { REACTIVATE_USER } from 'constants/shared/modalTypes';

const InactiveOperativesListItem = ({
    user,
    user: { userFirstName, userLastName, userEmail },
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
                {/* {moment().calendar()} */}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                <button className="button blue" onClick={handleRequestReactivation}>
                    Request Reactivation
                </button>
            </td>
        </tr>
    );

    function handleRequestReactivation() {
        dispatch(showModal(REACTIVATE_USER, { user }));
    }
};

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    onMobile,
});

export default InactiveOperativesListItem;
