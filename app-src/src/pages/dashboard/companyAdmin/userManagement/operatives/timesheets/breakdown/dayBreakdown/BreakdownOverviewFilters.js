import React from 'react';
import { useSelector } from 'react-redux';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';

import { filterByOptions, sortByOptions } from './hooks/useOverviewFilters';
import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';

const BreakdownOverviewFilters = ({ sortByType, sortDirection, filterByType, handleChange }) => {
    // TODO filter by user (owner, admin, operative), user with or without set hours, users with or without wages set
    // const dispatch = useDispatch();
    // const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);
    const selectedUserIDs = useSelector(timesheetSelectedCompanyIDs);

    return (
        <div className="filters">
            {!selectedUserIDs.length && (
                <Field name="Filter by">
                    {/* <div className="size-lg-7">
                        <RadioButton
                            name="filterByHasClockedIn"
                            value={filterByHasClockedIn}
                            checked={filterByHasClockedIn}
                            handleInputChange={(_, val) =>
                                dispatch(toggleFilterByHasClockedIn(!val))
                            }
                            text="Has Timesheet Data"
                        />
                    </div>
                    <div className="size-lg-5">
                        <RadioButton
                            name="filterByHasClockedIn"
                            value={filterByHasClockedIn}
                            checked={!filterByHasClockedIn}
                            handleInputChange={(_, val) =>
                                dispatch(toggleFilterByHasClockedIn(!val))
                            }
                            text="All Users"
                        />
                    </div> */}
                    <Select
                        name="filterByType"
                        value={filterByType}
                        options={filterByOptions}
                        onChange={handleChange}
                        omitPlaceholder
                    />
                </Field>
            )}
            <Field name="Sort By">
                <Select
                    name="sortByType"
                    value={sortByType}
                    options={sortByOptions}
                    onChange={handleChange}
                    omitPlaceholder
                />
            </Field>
            <button
                className="button"
                onClick={() => handleChange('sortDirection', sortDirection > 0 ? 0 : 1)}
            >
                <i className={`fas fa-arrow-up ${sortDirection > 0 ? 'asc' : 'desc'}`} />
            </button>
        </div>
    );
};

export default BreakdownOverviewFilters;
