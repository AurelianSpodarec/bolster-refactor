import React from 'react';
import { Link } from 'react-router-dom';

import DrawingMapFiltersAdvancedContainer from '../containers/DrawingMapFiltersAdvancedContainer';
import DrawingMapViewSimpleContainer from '../containers/DrawingMapViewSimpleContainer';
import DrawingInspectionLogContainer from '../containers/DrawingInspectionLogContainer';

const GeneralOverview = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <DrawingMapFiltersAdvancedContainer />
                    <DrawingMapViewSimpleContainer />
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
                <Link to="#" className="button">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </Link>
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
