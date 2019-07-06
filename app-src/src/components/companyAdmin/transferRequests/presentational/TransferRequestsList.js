import React from 'react';
import TransferRequestListItemContainer from '../containers/TransferRequestListItemContainer';

const TransferRequestsList = ({ requests, headers }) =>
    requests.map(request => (
        <TransferRequestListItemContainer
            key={request.id}
            request={request}
            headers={headers}
        />
    ));

export default TransferRequestsList;
