import React from 'react';
import { Link } from 'react-router-dom';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import BuildingsContainer from '../containers/BuildingsContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Site = () => (
    <div className="size-lg-12">
        <SiteDetailsContainer />
        <DocumentsTableContainer />
        <BuildingsContainer />
        <ClientsTableContainer />
        <OperativesTableContainer />
        <CompaniesAccessTableContainer />
    </div>
);

export default Site;
