import React from 'react';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Search from '../../../../../shared/generic/form/presentational/Search';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';

const WagesUserList = ({
    selectedUserIDs,
    handleToggleUserID,
    userFilter,
    setUserFilter,
    users,
    isFetching,
    fetchError,
}) => {
    return (
        <BlockContainer
            className="content-container size-lg-5"
            contentClass="wages-users-list"
            isFetching={isFetching}
            error={fetchError}
        >
            <BlockHeading title="All Users" />
            <Search
                name="usersFilter"
                value={userFilter}
                handleChange={(_, value) => setUserFilter(value)}
            />
            <div className="users-list">
                {users.map(({ id, userFirstName, userLastName }, i) => (
                    <div className="list-item" key={`${i}-${id}`}>
                        <Tickbox
                            name={`select-${id}`}
                            value={selectedUserIDs.includes(id)}
                            handleChange={() => handleToggleUserID(id)}
                        />
                        <p>{`${userFirstName} ${userLastName}`}</p>
                    </div>
                ))}
            </div>
        </BlockContainer>
    );
};

export default WagesUserList;
