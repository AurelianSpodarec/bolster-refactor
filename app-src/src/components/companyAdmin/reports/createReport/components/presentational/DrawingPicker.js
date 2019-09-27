import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingPicker = ({
    excludedDrawings,
    includedDrawings,
    handleExcludeDrawing,
    handleIncludeDrawing
}) => (
    <>
        <BlockContainer>
            <BlockHeading title="Drawing Container" />
            <div className="size-lg-6">
                <p>Excluded</p>
                {excludedDrawings.map(drawing => (
                    <p onClick={e => handleExcludeDrawing(e)} key={drawing.id}>
                        {drawing.name}
                    </p>
                ))}
            </div>
            <div className="size-lg-6">
                <p>Included</p>
                {includedDrawings.map(drawing => (
                    <p key={drawing.id} onClick={e => handleIncludeDrawing(e)}>
                        {drawing.name}
                    </p>
                ))}
            </div>
        </BlockContainer>
    </>
);

export default DrawingPicker;
