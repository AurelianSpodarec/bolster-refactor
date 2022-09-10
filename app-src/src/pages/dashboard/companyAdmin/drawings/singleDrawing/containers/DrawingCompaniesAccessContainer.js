import React from 'react';
import CompaniesAccessContainer from 'components_DEPRECATED/shared/companies/containers/CompaniesAccessContainer';

const DrawingCompaniesAccessContainer = ({ accessType }) => (
    <CompaniesAccessContainer smallPod={true} hierarchyType="drawing" accessType={accessType} />
);

export default DrawingCompaniesAccessContainer;
