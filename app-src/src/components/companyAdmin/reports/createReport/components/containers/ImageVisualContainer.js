import React from 'react';
import { useSelector } from 'react-redux';

import { filterOutput } from 'helpers/outputVisuals';

import ImageVisual from '../presentational/ImageVisual';

const ImageVisualContainer = () => {
    const filters = useSelector(
        ({
            companyAdmin: {
                reportsReducer: { filters },
            },
        }) => filters,
    );

    const filteredOutput = filterOutput(filters);

    if (filteredOutput.length === 0) return null;

    return <ImageVisual filterArr={filteredOutput} />;
};

export default ImageVisualContainer;
