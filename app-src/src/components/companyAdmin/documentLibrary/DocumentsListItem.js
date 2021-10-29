import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

let DocumentsListItem = ({
    toggleExpanded,
    isExpanded,
    item,
    colCount,
    permissions,
    forwardRef,
    isDragging,
    onMobile,
    headers,
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
                    <>
                        <td>
                            <i className={`fa fa-chevron-${isExpanded ? 'down' : 'right'}`} />
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                            <i className={`fa fa-file`} />
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                            {item.name}
                        </td>

                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                            ### Uploaded by ###
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                            <DateTimeContainer date={new Date()} datetime={DATE_TIME_IDS.DATE} />
                            {/* ### Upload date ### */}
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                            ### File size / Contents length ###
                        </td>
                    </>
                </tr>,
            )}
        </>
    );
};

DocumentsListItem = withToggleExpand(DocumentsListItem);
export default withDrag(DocumentsListItem, 'SITE');
