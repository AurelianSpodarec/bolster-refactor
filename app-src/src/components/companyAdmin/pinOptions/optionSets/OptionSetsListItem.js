import React from 'react';
import { Link } from 'react-router-dom';

const OptionSetsListItem = ({ set: { name } }) => (
    <tr>
        <td className="row-link">
            <Link to="/company/pin-options/tobedone/1">{name}</Link>
        </td>
        <td></td>
    </tr>
);

export default OptionSetsListItem;
