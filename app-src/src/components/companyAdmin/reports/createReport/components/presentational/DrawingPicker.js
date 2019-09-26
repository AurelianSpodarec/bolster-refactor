import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingPicker = ({ drawings }) => (
    <>
        <BlockContainer>
            <BlockHeading title="Drawing Container" />
            {drawings.map(drawing => (
                <p key={drawing.id}>{drawing.name}</p>
            ))}
        </BlockContainer>
    </>
);

export default DrawingPicker;
