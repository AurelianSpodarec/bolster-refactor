import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const BuldingsListItem = ({
    building,
    toggleExpanded,
    isExpanded,
    colCount,
    permissions,
    forwardRef,
    isDragging,
    headers,
    onMobile,
    colSpanFirst,
    connectDropTarget,
    isSorting,
}) => {
    let rowClass = 'draggable expandable';
    if (isExpanded) rowClass += ' open';
    if (isDragging) rowClass += ' dragging';
    return (
        <>
            {connectDropTarget(
                <tr
                    ref={isSorting ? forwardRef : null}
                    onClick={toggleExpanded}
                    className={rowClass}
                >
                    <td>
                        {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                        {isExpanded ? (
                            <i className="fa fa-chevron-down" />
                        ) : (
                            <i className="fa fa-chevron-right" />
                        )}{' '}
                        {building.name}
                    </td>
                    <td>
                        {' '}
                        {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                        <DateTimeContainer
                            date={building.createdOn}
                            datetime={DATE_TIME_IDS.DATE}
                        />
                    </td>
                    <td>
                        {' '}
                        {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                        {permissions}
                    </td>
                    <td>
                        {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                        <ButtonWrapper alignment="right">
                            <LinkButton
                                href={`/company/buildings/${building.id}`}
                                text="View"
                                size="small"
                                source="secondary"
                                ambient="positive"
                                handleClick={e => e.stopPropagation()}
                            />
                        </ButtonWrapper>
                    </td>
                </tr>,
            )}
            {isExpanded && (
                <tr className="expanded-row ">
                    <td
                        colSpan={colCount}
                        className="table-container"
                        style={{ display: isDragging ? 'none' : '' }}
                    >
                        <FloorTableContainer
                            className="with-actions"
                            ids={building.floorIDs}
                            colSpanFirst={colSpanFirst}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default withDrag(BuldingsListItem, 'BUILDING');
