import React from 'react';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import FloorsTableContainer from '../containers/FloorsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Building = () => (
    <div className="size-lg-12">
        <BuildingDetailsContainer />
        <DocumentsTableContainer />
        <FloorsTableContainer />
        <ClientsTableContainer />
        <OperativesTableContainer />
        <CompaniesAccessTableContainer />
    </div>
);

export default Building;
