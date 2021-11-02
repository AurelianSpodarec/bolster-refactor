import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';

let DocumentsListItem = ({
    item,
    forwardRef,
    isDragging,
    onMobile,
    headers,
    connectDropTarget,
    isSorting,
    isSelected = false,
    toggleItemSelect,
}) => {
    let rowClass = 'draggable expandable dl-row';
    if (isDragging) rowClass += ' dragging';

    return (
        <>
            {connectDropTarget(
                <tr ref={isSorting ? forwardRef : null} className={rowClass} onClick={() => {}}>
                    <>
                        <td className="dl-selection-container">
                            <div
                                className={`dl-selection`}
                                onClick={() => toggleItemSelect(item.id)}
                            >
                                <div
                                    className="selection-dot"
                                    style={{ opacity: isSelected ? 1 : 0 }}
                                />
                            </div>
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                            <img
                                src={
                                    item.fileExtension
                                        ? getIconFromExt(item.fileExtension)
                                        : FolderIcon
                                }
                                alt="File type icon"
                                width="24"
                                height="24"
                            />
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                            {item.name}
                        </td>

                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                            {item.uploadedBy}
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                            <DateTimeContainer
                                date={new Date(item.uploadDate)}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                        </td>
                        <td>
                            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                            {item.contentLength || '### No. of files ###'}
                        </td>
                    </>
                </tr>,
            )}
        </>
    );
};

DocumentsListItem = withToggleExpand(DocumentsListItem);
export default withDrag(DocumentsListItem, 'SITE');
