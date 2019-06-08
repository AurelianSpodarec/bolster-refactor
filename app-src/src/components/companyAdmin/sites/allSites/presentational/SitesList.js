import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const SitesList = ({ items: sites, colCount, forwardref, moveItem }) => (
    <tbody ref={forwardref}>
        {sites.map((site, i) => (
            <SitesListItemContainer
                key={site.id}
                site={site}
                colCount={colCount}
                index={i}
                moveItem={moveItem}
            />
        ))}
    </tbody>
);

export default withDropZone(SitesList);
