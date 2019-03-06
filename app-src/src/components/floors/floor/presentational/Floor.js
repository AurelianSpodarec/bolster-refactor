import React from 'react';

import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import DrawingsTableContainer from '../containers/DrawingsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <FloorDetailsContainer />
        <DocumentsTableContainer />
        <DrawingsTableContainer />
        <ClientsTableContainer />
        <OperativesTableContainer />
        <CompaniesAccessTableContainer />
    </div>
);

export default Floor;
