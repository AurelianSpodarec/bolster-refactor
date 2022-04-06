import React from 'react';
import { Link } from 'react-router-dom';

const OptionSetsListItem = ({ set: { id, name }, setLink }) => (
    <tr>
        <td className="row-link">
            <Link to={`/company/pin-options/${setLink}/${id}`}>{name}</Link>
        </td>
        <td></td>
    </tr>
);

export default OptionSetsListItem;
