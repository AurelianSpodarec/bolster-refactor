import React from 'react';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Search from '../../../../../shared/generic/form/presentational/Search';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import plusIcon from '_content/images/icons/plus-solid.svg';
import useColourTheme from '../../../../../../hooks/useColourTheme';

const WagesUserList = ({
    selectedUserIDs,
    handleToggleUserID,
    userFilter,
    setUserFilter,
    users,
    isFetching,
    fetchError,
}) => {
    const colourTheme = useColourTheme();

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
                {users.map((user, i) => {
                    const { id, userFirstName, userLastName } = user;
                    console.log(user);
                    return (
                        <div
                            key={`${i}-${id}`}
                            className="list-item flex-row flex justify-between align-center"
                        >
                            <div className="flex-row align-center">
                                <Tickbox
                                    name={`select-${id}`}
                                    value={selectedUserIDs.includes(id)}
                                    checked={selectedUserIDs.includes(id)}
                                    handleChange={() => handleToggleUserID(id)}
                                    label={`${userFirstName} ${userLastName}`}
                                />

                                <img
                                    src={plusIcon}
                                    alt={name}
                                    className="plus"
                                    style={
                                        colourTheme === 'light'
                                            ? {
                                                  webkitFilter: 'invert(0)',
                                                  filter: 'invert(0)',
                                              }
                                            : {}
                                    }
                                />
                            </div>

                            <div className="icon-wrapper">
                                <i className="fas fa-clock"></i>
                                <i className="fas fa-pound-sign"></i>
                            </div>
                        </div>
                    );
                })}
            </div>
        </BlockContainer>
    );
};

export default WagesUserList;
