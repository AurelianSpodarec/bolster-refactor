import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FilterMap from 'components/shared/maps/presentational/FilterMap';

const ShareLinkDrawing = ({ drawing, pins, headerText }) => (
    <BlockContainer containerClass="size-lg-12" heading={headerText}>
        <FilterMap drawing={drawing} pins={pins} />
    </BlockContainer>
);

export default ShareLinkDrawing;
