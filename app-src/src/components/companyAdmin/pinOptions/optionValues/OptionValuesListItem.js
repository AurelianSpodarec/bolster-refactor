import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const OptionValuesListItem = ({ option: { id, name, isDisabled }, setID, typeID }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(isDisabled);
    const typeLink = PIN_OPTION_TYPES[typeID].link;

    return (
        <tr>
            <td>
                <CheckboxContainer
                    text={name}
                    name={`pin-option-checkbox-${id}`}
                    checked={!isOptionDisabled}
                    handleChange={(_, value) => setIsOptionDisabled(!value)}
                />
            </td>
            <td>
                <Link
                    className="button blue"
                    to={`/company/pin-options/${typeLink}/${setID}/${id}/documents`}
                >
                    Documents
                </Link>
            </td>
        </tr>
    );
};

export default OptionValuesListItem;
