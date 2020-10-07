import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites, colCount, forwardRef, isSortingSites, headers }) => (
    // ! sort function now in sites table container to optionally sort by date added.
    <tbody ref={isSortingSites ? forwardRef : null} className={isSortingSites ? 'dragging' : ''}>
        {[...sites].map((site, i) => (
            <SitesListItemContainer
                key={site.id}
                site={site}
                colCount={colCount}
                index={i}
                headers={headers}
                isSortingSites={isSortingSites}
            />
        ))}
    </tbody>
);

export default SitesList;
