import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import deleteCompanyUserInvite from 'actions/companyAdmin/userManagement/async/deleteCompanyUserInvite';

import { RESEND_INVITE } from 'constants/shared/modalTypes';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../../shared/generic/button/presentational/ButtonWrapper';

const InvitedCompanyAdminsListItem = ({ user, headers }) => {
    const { userFirstName, userLastName, userEmail, id } = user;
    const { onMobile } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteCompanyUserInvite(id, user));
    };
    const handleResend = () => {
        dispatch(showModal(RESEND_INVITE, { user }));
    };

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
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Resend Invite"
                        onClick={handleResend}
                        icon="paper-plane"
                        size="small"
                        iconWeight="regular"
                    />

                    <ActionButton
                        text="Delete Invite"
                        onClick={handleDelete}
                        icon="trash-alt"
                        ambient="negative"
                        size="small"
                        iconWeight="regular"
                    />
                </ButtonWrapper>
            </td>
        </tr>
    );
};

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    onMobile,
});

export default InvitedCompanyAdminsListItem;
