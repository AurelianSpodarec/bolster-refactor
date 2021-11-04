import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS, DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import React, { useState } from 'react';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from './FileTypeIcon';
import { RAW_S3_STORAGE_URL } from 'config';
import { useSelector } from 'react-redux';
import { formatBytes } from './CreateDocumentForm';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    const [showDetails, setShowDetails] = useState(false);

    const users = useSelector(mapStateToProps) || {};

    return (
        <div className="grid-item">
            {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                <Link
                    to={`/company/document-library?prefix=${item.searchTerm}`}
                    title={`Open ${item.name}${item.fileExtension ? `.${item.fileExtension}` : ''}`}
                    className={`image-container ${showDetails ? 'show-details' : ''}`}
                >
                    <FileTypeIcon
                        src={FolderIcon}
                        alt={`${item.name} icon`}
                        width="auto"
                        height="160"
                    />
                    {showDetails && (
                        <div className="info-container">
                            <p>
                                {`Created by:
                                ${
                                    users[item.createdByCompanyUserID]
                                        ? `${users[item.createdByCompanyUserID].userFirstName} ${
                                              users[item.createdByCompanyUserID].userLastName
                                          }`
                                        : '-'
                                }`}
                            </p>
                            <p>Viewable in app: {item.isViewApp ? 'Yes' : 'No'}</p>
                            <p>Attachable to pins: {item.isAttachPins ? 'Yes' : 'No'}</p>
                        </div>
                    )}
                </Link>
            ) : (
                <a
                    className={`image-container ${showDetails ? 'show-details' : ''}`}
                    href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                    title={item.name}
                    target={item.type === DOCUMENT_LIBRARY_TYPES.FILE && '_blank'}
                >
                    <FileTypeIcon
                        src={getIconFromExt(item.fileExtension)}
                        alt={`${item.name} icon`}
                        width="auto"
                        height="160"
                    />
                    {showDetails && (
                        <div className="info-container">
                            <p>
                                {`Uploaded by:
                                ${
                                    users[item.createdByCompanyUserID]
                                        ? `${users[item.createdByCompanyUserID].userFirstName} ${
                                              users[item.createdByCompanyUserID].userLastName
                                          }`
                                        : '-'
                                }`}
                            </p>
                            <p>File size: {formatBytes(item.contentLength)}</p>
                            <p>Viewable in app: {item.isViewApp ? 'Yes' : 'No'}</p>
                            <p>Attachable to pins: {item.isAttachPins ? 'Yes' : 'No'}</p>
                        </div>
                    )}
                </a>
            )}
            {item.type === DOCUMENT_LIBRARY_TYPES.FOLDER ? (
                <div className="details-container">
                    {item.type === DOCUMENT_LIBRARY_TYPES.FILE && (
                        <Link
                            to={`/company/document-library?prefix=${item.searchTerm}`}
                            title={`Open ${item.name}`}
                        >
                            <FileTypeIcon src={getIconFromExt(item.fileExtension)} />
                        </Link>
                    )}
                    <Link
                        to={`/company/document-library?prefix=${item.searchTerm}`}
                        title={`Open ${item.name}`}
                    >
                        <p
                            style={
                                item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                    ? { maxWidth: 'calc(100% - 34px)' }
                                    : { maxWidth: '100%' }
                            }
                        >{`${item.name || '-'}`}</p>
                    </Link>
                    <button
                        className={'button grid-burger'}
                        type="button"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        <i className="fa fa-ellipsis-v" />
                    </button>
                </div>
            ) : (
                <div className="details-container">
                    {item.type === DOCUMENT_LIBRARY_TYPES.FILE && (
                        <a
                            href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                            title={`Open ${item.name}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FileTypeIcon src={getIconFromExt(item.fileExtension)} />
                        </a>
                    )}
                    <a
                        href={`${RAW_S3_STORAGE_URL}/${item.s3Key}`}
                        title={`Open ${item.name}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ width: '100%' }}
                    >
                        <p
                            style={
                                item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                    ? { maxWidth: 'calc(100% - 56px)' }
                                    : { maxWidth: '100%' }
                            }
                        >{`${item.name || '-'}`}</p>
                    </a>
                    <button
                        className={'button grid-burger'}
                        type="button"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        <i className="fa fa-ellipsis-v" />
                    </button>
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

const mapStateToProps = state => state.companyAdmin.companyUsersReducer.users;

export default DocumentsGridItem;
