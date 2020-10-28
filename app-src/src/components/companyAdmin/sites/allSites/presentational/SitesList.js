import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites, colCount, forwardRef, isSorting, headers, postSitesSort }) => (
    // ! sort function now in sites table container to optionally sort by date added.
    <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
        {sites.map((site, i) => (
            <SitesListItemContainer
                key={site.id}
                site={site}
                colCount={colCount}
                index={i}
                headers={headers}
                isSorting={isSorting}
                postSitesSort={postSitesSort}
            />
        ))}
    </tbody>
);

export default SitesList;
