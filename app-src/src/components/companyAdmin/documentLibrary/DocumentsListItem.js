import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import FileTypeIcon from './FileTypeIcon';

let DocumentsListItem = ({
    item,
    forwardRef,
    isDragging,
    onMobile,
    headers,
    isSorting,
    isSelected = false,
    toggleItemSelect,
}) => {
    let rowClass = 'draggable expandable dl-row';
    if (isDragging) rowClass += ' dragging';

    return (
        <tr ref={isSorting ? forwardRef : null} className={rowClass}>
            <>
                <td className="dl-selection-container">
                    <div className={`dl-selection`} onClick={() => toggleItemSelect(item.id)}>
                        <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
                    </div>
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                    <a
                        href={
                            item.type === 100
                                ? `/company/document-library?s3Key=${item.s3Key}`
                                : '/company/document-library' //WIP
                        }
                        title=""
                    >
                        <FileTypeIcon
                            src={
                                item.type === 200 ? getIconFromExt(item.fileExtension) : FolderIcon
                            }
                        />
                    </a>
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                    <a
                        href={
                            item.type === 100
                                ? `/company/document-library?s3Key=${item.s3Key}`
                                : '/company/document-library' //WIP
                        }
                        title=""
                    >
                        {item.name}
                    </a>
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                    {item.uploadedBy}
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                    <DateTimeContainer
                        date={new Date(item.createdOn)}
                        datetime={DATE_TIME_IDS.DATE}
                    />
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                    {item.contentLength || '### No. of files ###'}
                </td>
            </>
        </tr>
    );
};

export default DocumentsListItem;
