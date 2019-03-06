import React from 'react';

import DrawingMapFiltersSimpleContainer from '../containers/DrawingMapFiltersSimpleContainer';
import DrawingMapViewAdvancedContainer from '../containers/DrawingMapViewAdvancedContainer';
import DrawingReportOptionsContainer from '../containers/DrawingReportOptionsContainer';
import DrawingPinOptionsContainer from '../containers/DrawingPinOptionsContainer';

const AdvancedReport = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <div className="content-container size-lg-12">
                <div className="content-area">
                    <DrawingMapFiltersSimpleContainer />
                    <DrawingMapViewAdvancedContainer />
                </div>
            </div>

            <div className="content-container size-lg-12">
                <div className="content-area">
                    <DrawingReportOptionsContainer />
                </div>
            </div>
        </div>

        <div className="size-lg-4">
            <div className="content-container size-lg-12">
                <div className="content-area">
                    <DrawingPinOptionsContainer />
                </div>
            </div>
        </div>
    </div>
);

export default AdvancedReport;
