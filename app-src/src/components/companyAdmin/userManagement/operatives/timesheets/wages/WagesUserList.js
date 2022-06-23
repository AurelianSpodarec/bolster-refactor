import React from 'react';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Search from '../../../../../shared/generic/form/presentational/Search';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import plusIcon from '_content/images/icons/plus-solid.svg';
import useColourTheme from '../../../../../../hooks/useColourTheme';
import { COMPANY_USER_ROLE_TYPES } from '../../../../../../constants/companyAdmin/enums';

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
        <BlockContainer contentClass="wages-users-list" isFetching={isFetching} error={fetchError}>
            <BlockHeading title="All Users" />

            <div className="wages-filters-wrapper">
                <Search
                    name="usersFilter"
                    value={userFilter}
                    handleChange={(_, value) => setUserFilter(value)}
                />

                {/*<button className="reset-button">*/}
                {/*    <i className="fas fa-filter"></i>*/}
                {/*</button>*/}
            </div>

            <div className="users-list">
                {users.map((user, i) => {
                    const {
                        id,
                        userFirstName,
                        userLastName,
                        companyPayRateID,
                        type,
                        hasWorkingHoursSet,
                    } = user;
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

                                {type === COMPANY_USER_ROLE_TYPES.ADMIN_PLUS && (
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
                                )}
                            </div>

                            <div className="icon-wrapper">
                                {hasWorkingHoursSet && <i className="fas fa-clock"></i>}
                                {!!companyPayRateID && <i className="fas fa-pound-sign"></i>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </BlockContainer>
    );
};

export default WagesUserList;
