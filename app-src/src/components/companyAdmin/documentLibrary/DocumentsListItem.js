import React from 'react';
import { Link } from 'react-router-dom';
import { DATE_TIME_IDS, DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import FileTypeIcon from './FileTypeIcon';
import { formatBytes } from './CreateDocumentForm';
import { RAW_S3_STORAGE_URL } from 'config';
import { useSelector } from 'react-redux';
import { useQueryParam } from 'helpers/hooks';

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
    const prefix = useQueryParam('prefix') || '';
    let rowClass = 'draggable expandable dl-row';
    if (isDragging) rowClass += ' dragging';
    const isFile = item.type === DOCUMENT_LIBRARY_TYPES.FILE;
    const isFolder = item.type === DOCUMENT_LIBRARY_TYPES.FOLDER;
    const isViewApp = (isFile && item.isViewApp) || (isFolder && item.areChildrenViewApp);
    const isAttachPins = (isFile && item.isAttachPins) || (isFolder && item.areChildrenAttachPins);
    const users = useSelector(mapStateToProps) || {};
    const createdByUser = users[item.createdByCompanyUserID];
    const createdByUserName = createdByUser
        ? `${createdByUser.firstName} ${createdByUser.lastName}`
        : '';

    const folderName = item.name.replaceAll('/', '');

    return (
        <tr ref={isSorting ? forwardRef : null} className={rowClass}>
            <td className="dl-selection-container">
                <div className={'dl-selection'} onClick={() => toggleItemSelect(item.id)}>
                    <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
                </div>
            </td>
            <td className="hover-anim file-image">
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {isFile && (
                    <a
                        href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                        title={item.name}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FileTypeIcon src={getIconFromExt(item.fileExtension)} />
                    </a>
                )}
                {isFolder &&
                    (item.isArchived ? (
                        <p>
                            <FileTypeIcon src={FolderIcon} />
                        </p>
                    ) : (
                        <Link to={`/company/document-library?prefix=${prefix + item.name}`}>
                            <FileTypeIcon src={FolderIcon} />
                        </Link>
                    ))}
            </td>
            <td className="hover-anim file-name">
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {isFolder &&
                    (item.isArchived ? (
                        <p>{folderName}</p>
                    ) : (
                        <Link to={`/company/document-library?prefix=${prefix + item.name}`}>
                            <p>{folderName}</p>
                        </Link>
                    ))}
                {isFile && (
                    <a
                        href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                        title={item.name}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>{item.name}</p>
                    </a>
                )}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {createdByUserName}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                <DateTimeContainer date={new Date(item.createdOn)} datetime={DATE_TIME_IDS.DATE} />
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {isViewApp ? 'Yes' : 'No'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {isAttachPins ? 'Yes' : 'No'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                {item.contentLength ? formatBytes(item.contentLength) : ' '}
            </td>
        </tr>
    );
};

const mapStateToProps = state => state.companyAdmin.companyUsersReducer.users;

export default DocumentsListItem;
