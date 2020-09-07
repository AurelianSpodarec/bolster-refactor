import React from 'react';
import { useSelector } from 'react-redux';

import { imageToOutput } from 'helpers/outputVisuals';

import ImageVisual from '../presentational/ImageVisual';

const ImageVisualContainer = () => {
    const filters = useSelector(
        ({
            companyAdmin: {
                reportsReducer: { filters },
            },
        }) => filters,
    );

    const {
        isPDFGeneration,
        isCSVGeneration,
        isFloorplanGeneration,
        isOAndMManualGeneration,
        includePinLocation,
        includeFloorplan,
    } = filters;

    const visualsObj = {
        isPDFGeneration,
        isCSVGeneration,
        isFloorplanGeneration,
        isOAndMManualGeneration,
        includeFloorplan,
        includePinLocation,
    };

    imageToOutput(visualsObj);

    return <ImageVisual />;
};

export default ImageVisualContainer;
