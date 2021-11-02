import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from './FileTypeIcon';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    return (
        <a
            className="grid-item"
            href={`/company/document-library?prefix=${'#'}`}
            title={`Open ${item.name}${item.fileExtension ? `.${item.fileExtension}` : ''}`}
        >
            <div className="image-container">
                <FileTypeIcon
                    src={item.fileExtension ? getIconFromExt(item.fileExtension) : FolderIcon}
                    alt={`${item.name} icon`}
                    width="auto"
                    height="160"
                />
            </div>
            <div className="details-container">
                {!!item.fileExtension && <FileTypeIcon src={getIconFromExt(item.fileExtension)} />}
                <p>{`${item.name || '-'}${item.fileExtension ? '.' + item.fileExtension : ''}`}</p>
            </div>
            <p className="meta">
                Updated{' '}
                <DateTimeContainer date={new Date(item.createdOn)} datetime={DATE_TIME_IDS.DATE} />
            </p>
            <div className="dl-selection grid" onClick={() => toggleItemSelect(item.id)}>
                <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
            </div>
        </a>
    );
};

export default DocumentsGridItem;
