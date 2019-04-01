import React from 'react';
import { Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

import DrawingMapGeneralContainer from '../containers/DrawingMapGeneralContainer';
import DrawingInspectionLogContainer from '../containers/DrawingInspectionLogContainer';
import DrawingDocumentsContainer from '../containers/DrawingDocumentsContainer';
import DrawingClientAccessContainer from '../containers/DrawingClientAccessContainer';
import DrawingCompanyAccessContainer from '../containers/DrawingCompanyAccessContainer';
import DrawingOperativesAccessContainer from '../containers/DrawingOperativesAccessContainer';

const GeneralOverview = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <div className="size-lg-12">
                <DrawingMapGeneralContainer />
            </div>

            <div className="size-lg-6">
                <DrawingClientAccessContainer />
            </div>

            <div className="size-lg-6">
                <DrawingCompanyAccessContainer />
            </div>

            <div className="content-container size-lg-12">
                <Link to="#" className="button">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </Link>
            </div>
        </div>

        <div className="size-lg-4">
            <div className="size-lg-12">
                <DrawingInspectionLogContainer />
            </div>

            <div className="size-lg-12">
                <DrawingDocumentsContainer />
            </div>

            <div className="size-lg-12">
                <DrawingOperativesAccessContainer />
            </div>
        </div>
    </div>
);

export default GeneralOverview;
