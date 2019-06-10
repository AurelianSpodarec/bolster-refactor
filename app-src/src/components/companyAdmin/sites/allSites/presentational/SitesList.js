import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const SitesList = ({ items: sites, colCount, forwardRef, isOver }) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {[...sites]
            .sort((a, b) => a.sort - b.sort)
            .map((site, i) => (
                <SitesListItemContainer
                    key={site.id}
                    site={site}
                    colCount={colCount}
                    index={i}
                />
            ))}
    </tbody>
);

export default withDropZone(SitesList, 'SITE');
