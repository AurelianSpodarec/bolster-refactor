import React from 'react';
import moment from 'moment';

import SitesListItemContainer from '../containers/SitesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const SitesList = ({ items: sites, colCount, forwardRef, isOver, headers }) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {[...sites]
            .sort((a, b) => moment(b.createdOn) - moment(a.createdOn))
            .sort((a, b) => a.sort - b.sort)
            .map((site, i) => (
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

export default withDropZone(SitesList, 'SITE');
