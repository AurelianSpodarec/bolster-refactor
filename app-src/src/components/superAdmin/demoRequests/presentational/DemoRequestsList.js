import React from 'react';
import DemoRequestsListItemContainer from '../containers/DemoRequestsListItemContainer';

const DemoRequestsList = ({ demoRequests, colCount }) =>
    demoRequests.map((demoRequest, index) => (
        <DemoRequestsListItemContainer key={index} colCount={colCount} demoRequest={demoRequest} />
    ));

export default DemoRequestsList;
