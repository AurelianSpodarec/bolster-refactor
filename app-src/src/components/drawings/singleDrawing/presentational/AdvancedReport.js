import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import DrawingMapFiltersSimpleContainer from '../containers/DrawingMapFiltersSimpleContainer';
import DrawingMapViewAdvancedContainer from '../containers/DrawingMapViewAdvancedContainer';
import DrawingPinSelectorContainer from '../containers/DrawingPinSelectorContainer';
import DrawingReportOptionsContainer from '../containers/DrawingReportOptionsContainer';
import DrawingPinOptionsContainer from '../containers/DrawingPinOptionsContainer';

const AdvancedReport = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <Block>
                <DrawingMapFiltersSimpleContainer />
                <DrawingMapViewAdvancedContainer />
            </Block>

            <Block>
                <DrawingPinSelectorContainer />
            </Block>

            <Block>
                <DrawingReportOptionsContainer />
            </Block>
        </div>

        <div className="size-lg-4">
            <Block>
                <DrawingPinOptionsContainer />
            </Block>
        </div>
    </div>
);

export default AdvancedReport;
