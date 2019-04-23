import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const DrawingListItem = ({ drawing, permissions }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>
            <DateTimeContainer date={drawing.pinsLastUpdatedOn} />
        </td>
        <td>
            <DateTimeContainer date={drawing.expiresOn} />
        </td>
        <td>{permissions}</td>
        <td>
            <ButtonNoClickContainer to={`/company/drawings/${drawing.id}`}>
                View
            </ButtonNoClickContainer>
        </td>
    </tr>
);

export default DrawingListItem;
