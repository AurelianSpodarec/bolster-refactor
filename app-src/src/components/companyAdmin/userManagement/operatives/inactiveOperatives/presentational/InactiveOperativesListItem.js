import React from 'react';

const InactiveOperativesListItem = ({ user: { id, userFirstName, userLastName, userEmail } }) => {
    return (
        <tr>
            <td>{`${userFirstName} ${userLastName}`}</td>
            <td>{userEmail}</td>
            <td>
                <button className="button blue" onClick={handleRequestReactivation}>
                    Request reactivation
                </button>
            </td>
        </tr>
    );

    function handleRequestReactivation() {
        console.log(`request reactivation for id: ${id}`);
    }
};

export default InactiveOperativesListItem;
