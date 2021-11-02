import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React, { useState } from 'react';
import placeholder from '_content/images/examples/jamie.png';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import { getIconFromExt } from 'helpers/general';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    return (
        <div className="grid-item" onClick={() => {}}>
            <div className="image-container">
                <img
                    src={item.fileExtension ? getIconFromExt(item.fileExtension) : FolderIcon}
                    alt={`${item.name} icon`}
                    width="160"
                />
            </div>
            <div className="details-container">
                {!!item.fileExtension && (
                    <img
                        src={getIconFromExt(item.fileExtension)}
                        alt="file type icon"
                        height="24"
                        width="24"
                    />
                )}
                <p>{`${item.name || '-'}${item.fileExtension ? '.' + item.fileExtension : ''}`}</p>
            </div>
            <p className="meta">
                Updated{' '}
                <DateTimeContainer date={new Date(item.uploadDate)} datetime={DATE_TIME_IDS.DATE} />
            </p>
            <div className="dl-selection grid" onClick={() => toggleItemSelect(item.id)}>
                <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
            </div>
        </div>
    );
};

export default DocumentsGridItem;
