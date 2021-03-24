import React from 'react';
import { useSelector } from 'react-redux';

const InvitedCompanyAdminsListItem = ({
    user: { userFirstName, userLastName, userEmail },
    headers,
}) => {
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
            <td>{onMobile && <span className="mobile-table-heading">{headers[2]}</span>}</td>
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
