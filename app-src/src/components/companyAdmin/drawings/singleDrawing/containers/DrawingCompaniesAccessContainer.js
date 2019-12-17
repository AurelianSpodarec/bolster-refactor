import React from 'react';
import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

const DrawingCompaniesAccessContainer = ({ accessType }) => (
    <CompaniesAccessContainer smallPod={true} hierarchyType="drawing" accessType={accessType} />
);

export default DrawingCompaniesAccessContainer;
