import React from 'react';
import TransferRequestListItemContainer from '../containers/TransferRequestListItemContainer';

const TransferRequestsList = ({ requests }) =>
    requests.map(request => (
        <TransferRequestListItemContainer key={request.id} request={request} />
    ));

export default TransferRequestsList;
