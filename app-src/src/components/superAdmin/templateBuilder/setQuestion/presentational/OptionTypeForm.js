import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PIN_OPTION_TYPES_ENUM } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import { useSelector } from 'react-redux';
import { selectPinOptionSets } from '../../../../../selectors/superAdmin/pinOptionSets';
import MultiSelect from '../../../../shared/generic/form/presentational/MultiSelect';
import { selectPinOptions } from '../../../../../selectors/superAdmin/pinOptions';
import { selectPinOptionVersionsArr } from '../../../../../selectors/superAdmin/pinOptionVersions';
import { getLatestVersionForPinOption } from '../../../../../helpers/pinOptions';

const options = convertEnumToDropdownOptions(PIN_OPTION_TYPES_ENUM);

const OptionTypeForm = ({
    handleInputChange,
    optionType,
    defaultValue,
    pinOptionSetIDs,
    companyID,
}) => {
    const pinOptionSets = useSelector(selectPinOptionSets);
    const setOptions = Object.values(pinOptionSets)
        .filter(set => !set.isDeleted && !set.isDisabled)
        .filter(set => +optionType === set.pinOptionTypeID)
        .filter(set => !set.companyID || set.companyID === companyID)
        .map(set => ({ label: set.name, value: set.id }));

    const pinOptions = useSelector(selectPinOptions);
    const pinOptionVersions = useSelector(selectPinOptionVersionsArr);
    const pinOptionOptions = Object.values(pinOptions)
        .filter(opt => !pinOptionSetIDs?.length || pinOptionSetIDs.includes(opt.pinOptionSetID))
        .map(opt => {
            const latestVersion = getLatestVersionForPinOption(opt.id, pinOptionVersions);
            return {
                label: latestVersion.name,
                value: opt.id,
            };
        });

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
            {optionType && (
                <Field name="Option set">
                    <MultiSelect
                        name="pinOptionSetIDs"
                        value={pinOptionSetIDs ?? []}
                        options={setOptions}
                        placeholder="--- select option set ---"
                        onChange={handleInputChange}
                        required
                    />
                </Field>
            )}
            {options[optionType] && (
                <Field name="Option Default Value">
                    <Select
                        name="defaultValue"
                        options={pinOptionOptions}
                        value={defaultValue}
                        onChange={handleInputChange}
                    />
                </Field>
            )}
        </>
    );
};

export default OptionTypeForm;
