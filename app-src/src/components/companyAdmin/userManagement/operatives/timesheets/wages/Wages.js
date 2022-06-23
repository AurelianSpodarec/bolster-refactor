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
        handleSave,
        isPosting,
        companyPayRateOptions,
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
                isPosting={isPosting}
                isFetching={isFetching}
                error={fetchError}
                selectedUserIDs={selectedUserIDs}
                selectedPayRate={selectedPayRate}
                setSelectedPayRate={setSelectedPayRate}
                companyPayRateOptions={companyPayRateOptions}
                getUserNameByID={getUserNameByID}
                handleSave={handleSave}
            />
        </div>
    );
};

export default Wages;
