import React from 'react';

import useWages from './hooks/useWages';
import WagesUserList from './WagesUserList';
import WagesPayDetails from './WagesPayDetails';

const Wages = () => {
    const {
        getUserNameByID,
        selectedUserIDs,
        handleToggleUserID,
        userFilter,
        setUserFilter,
        users,
        isFetching,
        fetchError,
        selectedPayRate,
        setSelectedPayRate,
    } = useWages();

    return (
        <div className="width-12 wages-body">
            <WagesUserList
                selectedUserIDs={selectedUserIDs}
                handleToggleUserID={handleToggleUserID}
                userFilter={userFilter}
                setUserFilter={setUserFilter}
                users={users}
                isFetching={isFetching}
                fetchError={fetchError}
            />

            <WagesPayDetails
                selectedUserIDs={selectedUserIDs}
                getUserNameByID={getUserNameByID}
                selectedPayRate={selectedPayRate}
                setSelectedPayRate={setSelectedPayRate}
            />
        </div>
    );
};

export default Wages;
