import React from 'react';

import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import DrawingsTableContainer from '../containers/DrawingsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <div className="content-container size-lg-8">
            <div className="content-area site-details size-lg-12">
                <FloorDetailsContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <DocumentsTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <DrawingsTableContainer />
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

export default Floor;
