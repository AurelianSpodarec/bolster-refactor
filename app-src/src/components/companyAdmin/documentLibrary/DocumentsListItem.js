import React from 'react';
import { Link } from 'react-router-dom';
import { DATE_TIME_IDS, DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import FileTypeIcon from './FileTypeIcon';
import { formatBytes } from './CreateDocumentForm';
import { RAW_S3_STORAGE_URL } from 'config';

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
                    <div className={'dl-selection'} onClick={() => toggleItemSelect(item.id)}>
                        <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
                    </div>
                </td>
                <td className="hover-anim">
                    {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                    {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                        <Link to={`/company/document-library?prefix=${item.searchTerm}`}>
                            <FileTypeIcon
                                src={
                                    item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                        ? getIconFromExt(item.fileExtension)
                                        : FolderIcon
                                }
                            />
                        </Link>
                    ) : (
                        <a
                            href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                            title={item.name}
                            target={item.type === DOCUMENT_LIBRARY_TYPES.FILE && '_blank'}
                        >
                            <FileTypeIcon
                                src={
                                    item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                        ? getIconFromExt(item.fileExtension)
                                        : FolderIcon
                                }
                            />
                        </a>
                    )}
                </td>
                <td className="hover-anim">
                    {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                    {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                        <Link to={`/company/document-library?prefix=${item.searchTerm}`}>
                            <p>{item.name}</p>
                        </Link>
                    ) : (
                        <a
                            href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                            title={item.name}
                            target={item.type === DOCUMENT_LIBRARY_TYPES.FILE && '_blank'}
                        >
                            <p>{item.name}</p>
                        </a>
                    )}
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
                    {item.isViewApp ? 'Yes' : '-'}
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                    {item.isAttachPins ? 'Yes' : '-'}
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                    {item.contentLength ? formatBytes(item.contentLength) : ' '}
                </td>
            </>
        </tr>
    );
};

export default DocumentsListItem;
