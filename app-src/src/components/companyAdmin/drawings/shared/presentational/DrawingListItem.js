import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';

const DrawingListItem = ({
    drawing,
    permissions,
    forwardRef,
    isDragging,
    headers,
    onMobile
}) => (
    <tr
        ref={forwardRef}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="draggable"
    >
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {drawing.name}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}{' '}
            <DateTimeContainer
                datetime={DATE_TIME_IDS.DATE}
                date={drawing.createdOn}
            />
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}{' '}
            <DateTimeContainer date={drawing.pinsLastUpdatedOn} />
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}{' '}
            <DateTimeContainer date={drawing.expiresOn} />
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[4]}</span>
            )}
            {permissions}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[5]}</span>
            )}
            <ButtonContainer to={`/company/drawings/${drawing.id}`}>
                View
            </ButtonContainer>
        </td>
    </tr>
);

export default withDrag(DrawingListItem, 'DRAWING');
