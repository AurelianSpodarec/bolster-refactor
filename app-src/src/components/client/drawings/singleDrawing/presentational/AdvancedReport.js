import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import DrawingMapAdvancedContainer from '../containers/DrawingMapAdvancedContainer';
import DrawingPinSelectorContainer from '../containers/DrawingPinSelectorContainer';
import DrawingReportOptionsContainer from '../containers/DrawingReportOptionsContainer';
import DrawingPinOptionsContainer from '../containers/DrawingPinOptionsContainer';

const AdvancedReport = () => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <Block>
                <DrawingMapAdvancedContainer />
            </Block>
        </div>
        <div className="size-lg-8">
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
