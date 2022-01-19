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
        const convertedOptions = dropdownOptions
            .reduce((acc, opt) => {
                if (opt.type === +optionType) {
                    if (serviceID && opt.serviceIDs?.length) {
                        if (opt.serviceIDs.includes(+serviceID)) {
                            acc.push({ label: opt.name, value: opt.name });
                        }
                    } else {
                        acc.push({ label: opt.name, value: opt.name });
                    }
                }

                return acc;
            }, [])
            .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));

        return convertedOptions;
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
