import React from 'react';
import { Link } from 'react-router-dom';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';

import DocumentsContainer from '../containers/DocumentsContainer';

const Site = () => (
    <div className="size-lg-12">
        <SiteDetailsContainer />
        <DocumentsContainer />

        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-1 size-lg-12">
                    BuildingsTableContainer
                </h1>
                <Link className="button green" to="/buildings/1">
                    View Building
                </Link>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    InviteClientContainer
                </h1>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    AddOperativeContainer
                </h1>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    CompaniesAccessContainer
                </h1>
            </div>
        </div>
    </div>
);

export default Site;
