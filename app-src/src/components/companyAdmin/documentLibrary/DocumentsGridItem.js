import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import { getIconFromExt, stripS3Key } from 'helpers/general';
import FileTypeIcon from './FileTypeIcon';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    return (
        <div className="grid-item">
            <Link
                to={
                    item.type === 100
                        ? `/company/document-library?s3Key=${stripS3Key(
                              item.s3Key,
                              item.companyID,
                          )}`
                        : '/company/document-library'
                }
                title={`Open ${item.name}${item.fileExtension ? `.${item.fileExtension}` : ''}`}
                className="image-container"
            >
                <FileTypeIcon
                    src={item.type === 200 ? getIconFromExt(item.fileExtension) : FolderIcon}
                    alt={`${item.name} icon`}
                    width="auto"
                    height="160"
                />
            </Link>
            <Link
                className="details-container"
                to={
                    item.type === 100
                        ? `/company/document-library?s3Key=${stripS3Key(
                              item.s3Key,
                              item.companyID,
                          )}`
                        : '/company/document-library'
                }
                title={`Open ${item.name}${item.fileExtension ? `.${item.fileExtension}` : ''}`}
            >
                {item.type === 200 && <FileTypeIcon src={getIconFromExt(item.fileExtension)} />}
                <p
                    style={
                        item.type === 200 ? { maxWidth: 'calc(100% - 34px)' } : { maxWidth: '100%' }
                    }
                >{`${item.name || '-'}${item.type === 200 ? '.' + item.fileExtension : ''}`}</p>
            </Link>
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
