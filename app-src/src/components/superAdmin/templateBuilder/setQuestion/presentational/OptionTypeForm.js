import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { DROPDOWN_OPTION_ENUM } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const options = convertEnumToDropdownOptions(DROPDOWN_OPTION_ENUM);

const OptionTypeFrom = ({ handleInputChange, optionType }) => (
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
);

export default OptionTypeFrom;
