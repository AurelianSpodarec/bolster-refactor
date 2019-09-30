import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DrawingPicker = ({
    excludedDrawings,
    includedDrawings,
    handleAddIncluded,
    handleDrawingClick,
    handleAddExcluded,
    selectedDrawings
}) => (
    <>
        <BlockContainer>
            <BlockHeading title="Available Drawings to Report" />
            <div className="pin-selector size-lg-12 form-field">
                <div className="pin-selection-box">
                    <h3>Excluded</h3>
                    <div className="content excluded size-lg-12">
                        {excludedDrawings.map(drawing => (
                            <div
                                className={`selector-pin ${
                                    selectedDrawings.includes(drawing.id) ? 'active' : ''
                                }`}
                                onClick={e => handleDrawingClick(e, drawing.id)}
                                key={drawing.id}
                            >
                                {drawing.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pin-selection-buttons">
                    <ButtonContainer className="exclude icon-only" handleClick={handleAddExcluded}>
                        <i className="far fa-long-arrow-left" />
                    </ButtonContainer>
                    <ButtonContainer className="include icon-only" handleClick={handleAddIncluded}>
                        <i className="far fa-long-arrow-right" />
                    </ButtonContainer>
                </div>

                <div className="pin-selection-box">
                    <h3>Included</h3>
                    <div className="content excluded size-lg-12">
                        {includedDrawings.map(drawing => (
                            <div
                                className={`selector-pin ${
                                    selectedDrawings.includes(drawing.id) ? 'active' : ''
                                }`}
                                onClick={e => handleDrawingClick(e, drawing.id)}
                                key={drawing.id}
                            >
                                {drawing.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BlockContainer>
    </>
);

export default DrawingPicker;
