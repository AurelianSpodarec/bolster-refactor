import React from 'react';
import { imageToOutput, isTherePDF } from 'helpers/outputVisuals';
import ImageVisualMultiple from './ImageVisualMultiple';
import useColourTheme from 'hooks/useColourTheme';

const ImageVisual = ({ filterArr }) => {
    const colourTheme = useColourTheme();
    if (filterArr.length > 1) return <ImageVisualMultiple filterArr={filterArr} />;

    return (
        <div className={`image-visual ${isTherePDF(filterArr)}`}>
            <img
                src={imageToOutput(filterArr)}
                alt="Icon"
                style={
                    colourTheme === 'dark'
                        ? {
                              webkitFilter: 'invert(0.8)',
                              filter: 'invert(0.8)',
                          }
                        : {}
                }
            />
        </div>
    );
};

export default ImageVisual;
