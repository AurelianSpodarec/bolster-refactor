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
            <Block>
                <DrawingMapGeneralContainer />
            </Block>

            <Block containerClass="size-lg-6">
                <DrawingClientAccessContainer />
            </Block>

            <Block containerClass="size-lg-6">
                <DrawingCompanyAccessContainer />
            </Block>

            <div className="content-container size-lg-12">
                <Link to="#" className="button">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </Link>
            </div>
        </div>

        <div className="size-lg-4">
            <Block>
                <DrawingInspectionLogContainer />
            </Block>

            <Block>
                <DrawingDocumentsContainer />
            </Block>

            <Block>
                <DrawingOperativesAccessContainer />
            </Block>
        </div>
    </div>
);

export default GeneralOverview;
