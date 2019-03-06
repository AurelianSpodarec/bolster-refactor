import React from 'react';

import DrawingMapFiltersContainer from 'components/drawings/singleDrawing/containers/DrawingMapFiltersContainer';
import DrawingMapViewContainer from 'components/drawings/singleDrawing/containers/DrawingMapViewContainer';
import DrawingInspectionLogContainer from 'components/drawings/singleDrawing/containers/DrawingInspectionLogContainer';

const GeneralOverview = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <DrawingMapFiltersContainer />
                    <DrawingMapViewContainer />
                </div>
            </div>

            <div className="content-container size-lg-6">
                <div className="content-area size-lg-12">
                    <p>Clients with access container</p>
                </div>
            </div>

            <div className="content-container size-lg-6">
                <div className="content-area size-lg-12">
                    <p>Companies with access container</p>
                </div>
            </div>

            <div className="content-container size-lg-12">
                <a className="button" href="#/">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </a>
            </div>
        </div>

        <div className="size-lg-4">
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <DrawingInspectionLogContainer />
                </div>
                <div className="content-area size-lg-12">
                    <p>Documents container</p>
                </div>
                <div className="content-area size-lg-12">
                    <p>Operatives with access container</p>
                </div>
            </div>
        </div>
    </div>
);

export default GeneralOverview;
