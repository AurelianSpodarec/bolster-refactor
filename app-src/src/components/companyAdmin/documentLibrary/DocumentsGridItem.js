import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React, { useState } from 'react';
import placeholder from '_content/images/examples/jamie.png';

const DocumentsGridItem = ({ item, isSelected, toggleItemSelect }) => {
    const [isOver, setIsOver] = useState(false);
    return (
        <div
            className="grid-item"
            onClick={() => toggleItemSelect(item.id)}
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            <div className="image-container">
                <img src={placeholder} alt={`${item.name} icon`} width="160" />
            </div>
            <div className="details-container">
                <img src={placeholder} alt="file type icon" height="24" width="24" />
                <p>{`${item.name || '-'}${item.fileExtension ? '.' + item.fileExtension : ''}`}</p>
            </div>
            <p className="meta">
                Updated{' '}
                <DateTimeContainer date={new Date(item.uploadDate)} datetime={DATE_TIME_IDS.DATE} />
            </p>
            <div className={`dl-selection grid`}>
                <div className="selection-dot" style={{ opacity: isSelected ? 1 : 0 }} />
            </div>
        </div>
    );
};

export default DocumentsGridItem;
