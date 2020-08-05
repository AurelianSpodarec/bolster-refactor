import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites, colCount, forwardRef, isOver, headers }) => (
    // ! sort function now in sites table container to optionally sort by date added.
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {[...sites].map((site, i) => (
            <SitesListItemContainer
                key={site.id}
                site={site}
                colCount={colCount}
                index={i}
                headers={headers}
            />
        ))}
    </tbody>
);

export default SitesList;
