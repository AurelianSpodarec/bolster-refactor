import React from 'react';
import FilterMap from 'components_DEPRECATED/shared/maps/presentational/FilterMap';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';
import { pageMeta } from 'constants/frontEnd/meta';

const ShareLinkDrawing = ({ drawing, pins, headerText }) => {
    const meta = {
        title: headerText,
        description: pageMeta.shareLinkDrawing.description,
        canonical: pageMeta.shareLinkDrawing.canonical,
        excludeFromSearchEngines: pageMeta.shareLinkDrawing.excludeFromSearchEngines,
    };

    return (
        <>
            <PageMeta meta={meta} />
            <div className="drawing-page-wrapper">
                <h2>{headerText}</h2>
                <FilterMap drawing={drawing} pins={pins} />
            </div>
        </>
    );
};

export default ShareLinkDrawing;
