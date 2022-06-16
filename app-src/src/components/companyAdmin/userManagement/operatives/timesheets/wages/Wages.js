import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Search from 'components/shared/generic/form/presentational/Search';
import useWages from './hooks/useWages';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';

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
    } = useWages();

    return (
        <div className="width-12 wages-body">
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
            <BlockContainer className="content-container size-lg-7">
                <BlockHeading
                    title={
                        selectedUserIDs.length
                            ? selectedUserIDs.length === 1
                                ? getUserNameByID(selectedUserIDs[0])
                                : 'Multiple Users'
                            : 'All Users'
                    }
                />
            </BlockContainer>
        </div>
    );
};

export default Wages;
