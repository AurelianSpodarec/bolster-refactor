import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { REACTIVATE_USER } from 'constants/shared/modalTypes';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../../shared/generic/button/presentational/ButtonWrapper';

const InactiveOperativesListItem = ({
    user,
    user: { userFirstName, userLastName, userEmail, reactivateRequestedOn },
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
                {reactivateRequestedOn ? <DateTimeContainer date={reactivateRequestedOn} /> : '--'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Request Reactivation"
                        onClick={handleRequestReactivation}
                        size="small"
                    />
                </ButtonWrapper>
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
