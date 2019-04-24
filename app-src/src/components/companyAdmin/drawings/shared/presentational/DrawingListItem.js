import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
            <ButtonContainer to={`/company/drawings/${drawing.id}`}>
                View
            </ButtonContainer>
        </td>
    </tr>
);

export default DrawingListItem;
