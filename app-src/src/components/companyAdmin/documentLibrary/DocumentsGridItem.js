import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS, DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import React from 'react';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from './FileTypeIcon';
import { RAW_S3_STORAGE_URL } from 'config';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    return (
        <div className="grid-item">
            {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                <Link
                    to={`/company/document-library?prefix=${item.searchTerm}`}
                    title={`Open ${item.name}${item.fileExtension ? `.${item.fileExtension}` : ''}`}
                    className="image-container"
                >
                    <FileTypeIcon
                        src={
                            item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                ? getIconFromExt(item.fileExtension)
                                : FolderIcon
                        }
                        alt={`${item.name} icon`}
                        width="auto"
                        height="160"
                    />
                </Link>
            ) : (
                <a
                    className="image-container"
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
                        alt={`${item.name} icon`}
                        width="auto"
                        height="160"
                    />
                </a>
            )}
            {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                <Link
                    className="details-container"
                    to={`/company/document-library?prefix=${item.searchTerm}`}
                    title={`Open ${item.name}`}
                >
                    {item.type === DOCUMENT_LIBRARY_TYPES.FILE && (
                        <FileTypeIcon src={getIconFromExt(item.fileExtension)} />
                    )}
                    <p
                        style={
                            item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                ? { maxWidth: 'calc(100% - 34px)' }
                                : { maxWidth: '100%' }
                        }
                    >{`${item.name || '-'}`}</p>
                </Link>
            ) : (
                <div className="details-container">
                    {item.type === DOCUMENT_LIBRARY_TYPES.FILE && (
                        <FileTypeIcon src={getIconFromExt(item.fileExtension)} />
                    )}
                    <p
                        style={
                            item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                ? { maxWidth: 'calc(100% - 34px)' }
                                : { maxWidth: '100%' }
                        }
                    >{`${item.name || '-'}`}</p>
                </div>
            )}
            <p className="meta">
                Updated{' '}
                <DateTimeContainer date={new Date(item.createdOn)} datetime={DATE_TIME_IDS.DATE} />
            </p>
            <div className="dl-selection grid" onClick={() => toggleItemSelect(item.id)}>
                <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
            </div>
        </div>
    );
};

export default DocumentsGridItem;
