import React from 'react';

import useUsersFilter from './hooks/useUsersFilter';
import useColourTheme from 'hooks/useColourTheme';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Search from '../../../../../shared/generic/form/presentational/Search';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import FiltersPopup from './FiltersPopup';

import plusIcon from '_content/images/icons/plus-solid.svg';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { TABLE_SORT_DIRECTIONS } from 'constants/shared/tables';

const { ASC } = TABLE_SORT_DIRECTIONS;

const WagesUserList = ({ selectedUserIDs, handleToggleUserID, isFetching, fetchError }) => {
    const colourTheme = useColourTheme();
    const {
        sortDirection,
        handleSort,
        showFiltersPopup,
        setShowFiltersPopup,
        filteredUsers,
        userFilter,
        setUserFilter,
        userRoleOptions,
        selectedRole,
        setSelectedRole,
        hasWageSet,
        setHasWageSet,
        hasHoursSet,
        setHasHoursSet,
    } = useUsersFilter();

    return (
        <BlockContainer contentClass="wages-users-list" isFetching={isFetching} error={fetchError}>
            <div className="flex-column">
                <BlockHeading title="All Users" />

                <div className="wages-filters-wrapper flex-row">
                    <Search
                        name="usersFilter"
                        value={userFilter}
                        handleChange={(_, value) => setUserFilter(value)}
                    />

                    <button
                        className="reset-button"
                        onClick={() => setShowFiltersPopup(!showFiltersPopup)}
                    >
                        <i className="fas fa-filter"></i>
                    </button>

                    {showFiltersPopup && (
                        <FiltersPopup
                            userRoleOptions={userRoleOptions}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            hasWageSet={hasWageSet}
                            setHasWageSet={setHasWageSet}
                            hasHoursSet={hasHoursSet}
                            setHasHoursSet={setHasHoursSet}
                            setShowFiltersPopup={setShowFiltersPopup}
                        />
                    )}

                    <button className="reset-button" onClick={handleSort}>
                        <i
                            className={`sort-icon fa fa-${
                                sortDirection === ASC ? 'sort-amount-up' : 'sort-amount-down'
                            }`}
                        ></i>
                    </button>
                </div>
            </div>

            <div className="users-list">
                {filteredUsers.map((user, i) => {
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
