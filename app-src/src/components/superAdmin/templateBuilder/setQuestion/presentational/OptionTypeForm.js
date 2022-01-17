import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { DROPDOWN_OPTION_ENUM } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const options = convertEnumToDropdownOptions(DROPDOWN_OPTION_ENUM);

const OptionTypeFrom = ({
    handleInputChange,
    optionType,
    dropdownOptions = [],
    defaultValue,
    serviceID,
}) => {
    const getOptions = () => {
        const dropdownOptNames = dropdownOptions
            .filter(opt => {
                if (opt.type === +optionType) {
                    if (serviceID && opt.serviceIDs?.length) {
                        return opt.serviceIDs.includes(serviceID);
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            })
            .map(opt => opt.name);

        return [...new Set(dropdownOptNames)]
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map(name => ({ label: name, value: name }));
    };

    return (
        <>
            <Field name="Option type" required>
                <DropdownContainer
                    name="optionType"
                    options={Object.values(options)}
                    selectedOption={options[optionType]}
                    placeholder="--- select option type ---"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            {options[optionType] && (
                <Field name="Option Default Value">
                    <Select
                        name="defaultValue"
                        options={getOptions()}
                        value={defaultValue}
                        onChange={handleInputChange}
                    />
                </Field>
            )}
        </>
    );
};

export default OptionTypeFrom;
