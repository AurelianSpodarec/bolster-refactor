import React from 'react';
import deleteCompanyUserInvite from 'actions/companyAdmin/userManagement/async/deleteCompanyUserInvite';
import { useDispatch, useSelector } from 'react-redux';

const InvitedCompanyAdminsListItem = ({ user, headers }) => {
    const { userFirstName, userLastName, userEmail, id } = user;
    const { onMobile } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteCompanyUserInvite(id, user));
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
                <button className="button red" onClick={handleDelete}>
                    <i className="fas fa-trash" />
                    Delete Invite
                </button>
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
