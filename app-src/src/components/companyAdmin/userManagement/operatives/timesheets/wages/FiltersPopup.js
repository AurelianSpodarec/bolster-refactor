import React from 'react';
import Field from '../../../../../shared/generic/form/presentational/Field';
import Select from '../../../../../shared/generic/form/presentational/Select';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';

const FiltersPopup = ({
    userRoleOptions,
    selectedRole,
    setSelectedRole,
    hasWageSet,
    setHasWageSet,
    hasHoursSet,
    setHasHoursSet,
    setShowFiltersPopup,
}) => {
    return (
        <div className="filters-popup">
            <div className="flex-column">
                <Field name="User role">
                    <Select
                        options={userRoleOptions}
                        classes="medium"
                        omitPlaceholder
                        value={selectedRole}
                        onChange={(_, value) => setSelectedRole(value)}
                    />
                </Field>
                <Field>
                    <Tickbox
                        value={hasWageSet}
                        checked={hasWageSet}
                        handleChange={() => setHasWageSet(!hasWageSet)}
                        label="Has wage set"
                    />
                </Field>

                <Field>
                    <Tickbox
                        value={hasHoursSet}
                        checked={hasHoursSet}
                        handleChange={() => setHasHoursSet(!hasHoursSet)}
                        label="Has set hours"
                    />
                </Field>

                <div className="flex-row justify-end">
                    <ActionButton text="Confirm" onClick={() => setShowFiltersPopup(false)} />
                </div>
            </div>
        </div>
    );
};

export default FiltersPopup;
