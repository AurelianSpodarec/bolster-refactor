import React from 'react';
import FilterMap from 'components/shared/maps/presentational/FilterMap';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const ShareLinkDrawing = ({ drawing, pins, headerText }) => (
    <>
        <Helmet title={headerText} />
        <div className="drawing-page-wrapper">
            <h2>{headerText}</h2>
            <FilterMap drawing={drawing} pins={pins} />
        </div>
    </>
);

export default ShareLinkDrawing;
