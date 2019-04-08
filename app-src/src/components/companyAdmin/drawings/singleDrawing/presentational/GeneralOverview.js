import React from 'react';
import { Link } from 'react-router-dom';

import DrawingMapGeneralContainer from '../containers/DrawingMapGeneralContainer';
import DrawingDocumentsContainer from '../containers/DrawingDocumentsContainer';
import DrawingClientAccessContainer from '../containers/DrawingClientAccessContainer';
import DrawingCompaniesAccessContainer from '../containers/DrawingCompaniesAccessContainer';
import DrawingOperativesAccessContainer from '../containers/DrawingOperativesAccessContainer';

const GeneralOverview = () => (
    <>
        <div className="size-lg-12">
            <div className="size-lg-12">
                <DrawingMapGeneralContainer />
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-3">
                <DrawingClientAccessContainer />
            </div>

            <div className="size-lg-3">
                <DrawingCompaniesAccessContainer />
            </div>

            <div className="size-lg-3">
                <DrawingDocumentsContainer />
            </div>

            <div className="size-lg-3">
                <DrawingOperativesAccessContainer />
            </div>

            <div className="content-container size-lg-12">
                <Link to="#" className="button">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </Link>
            </div>
        </div>
    </>
);

export default GeneralOverview;
