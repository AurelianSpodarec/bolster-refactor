import React from 'react';
import { imageToOutput, isTherePDF } from 'helpers/outputVisuals';
import ImageVisualMultiple from './ImageVisualMultiple';

const ImageVisual = ({ filterArr }) => {
    if (filterArr.length > 1) return <ImageVisualMultiple filterArr={filterArr} />;

    return (
        <div className={`image-visual ${isTherePDF(filterArr)}`}>
            <img src={imageToOutput(filterArr)} alt="Icon" />
        </div>
    );
};

export default ImageVisual;
