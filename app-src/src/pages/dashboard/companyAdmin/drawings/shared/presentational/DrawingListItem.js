import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const DrawingListItem = ({
    drawing,
    permissions,
    forwardRef,
    isDragging,
    headers,
    colSpanFirst,
    onMobile,
    connectDropTarget,
    isSorting,
}) => {
    let rowClass = 'draggable';
    if (isDragging) rowClass += ' dragging';

    return connectDropTarget(
        <tr ref={isSorting ? forwardRef : null} className={rowClass}>
            <td colSpan={colSpanFirst ? '2' : ''}>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {drawing.name}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}{' '}
                <DateTimeContainer datetime={DATE_TIME_IDS.DATE} date={drawing.createdOn} />
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}{' '}
                <DateTimeContainer date={drawing.pinsLastUpdatedOn} />
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}{' '}
                <DateTimeContainer date={drawing.expiresOn} />
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {permissions}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                <ButtonWrapper alignment="right">
                    <LinkButton
                        href={`/company/drawings/${drawing.id}`}
                        text="View"
                        size="small"
                        source="secondary"
                        ambient="positive"
                        handleClick={e => e.stopPropagation()}
                    />
                </ButtonWrapper>
            </td>
        </tr>,
    );
};

export default withDrag(DrawingListItem, 'DRAWING');
