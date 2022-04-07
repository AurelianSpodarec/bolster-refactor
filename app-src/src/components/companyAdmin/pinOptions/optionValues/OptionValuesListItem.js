import React from 'react';
import { Link } from 'react-router-dom';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

const OptionValuesListItem = ({ option: { id, name }, setID, typeID }) => {
    const typeLink = PIN_OPTION_TYPES[typeID].link;

    return (
        <tr>
            <td>{name}</td>
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
