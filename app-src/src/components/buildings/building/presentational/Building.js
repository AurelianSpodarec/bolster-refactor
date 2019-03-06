import React from 'react';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import FloorsTableContainer from '../containers/FloorsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Building = () => (
    <div className="size-lg-12">
        <div className="content-container size-lg-8">
            <div className="content-area site-details size-lg-12">
                <BuildingDetailsContainer />
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <DocumentsTableContainer />
            </div>
        </div>

        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <FloorsTableContainer />
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

export default Building;
