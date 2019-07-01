import React from 'react';
import DemoRequestsListItemContainer from '../containers/DemoRequestsListItemContainer';

const DemoRequestsList = ({ demoRequests, colCount }) =>
    demoRequests.map((demoRequest, i) => (
        <DemoRequestsListItemContainer
            key={demoRequest.id + i}
            colCount={colCount}
            demoRequest={demoRequest}
        />
    ));

export default DemoRequestsList;
