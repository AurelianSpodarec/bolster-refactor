import React from 'react';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import BuildingsTableContainer from '../containers/BuildingsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Site = () => (
    <div className="size-lg-12">
        <div className="content-container size-lg-8">
            <div className="content-area site-details size-lg-12">
                <SiteDetailsContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <DocumentsTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <BuildingsTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <ClientsTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <OperativesTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <CompaniesAccessTableContainer />
            </div>
        </div>
    </div>
);

export default Site;
