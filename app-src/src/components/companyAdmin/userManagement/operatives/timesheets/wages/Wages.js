import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Search from 'components/shared/generic/form/presentational/Search';
import useWages from './hooks/useWages';

const Wages = () => {
    const { userFilter, setUserFilter, users, isFetching, fetchError } = useWages();

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
                        <div
                            className="list-item"
                            key={`${i}-${id}`}
                        >{`${userFirstName} ${userLastName}`}</div>
                    ))}
                </div>
            </BlockContainer>
            <BlockContainer className="content-container size-lg-5">
                <BlockHeading title="### Username ###" />
            </BlockContainer>
        </div>
    );
};

export default Wages;
