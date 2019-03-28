import React from 'react';
import moment from 'moment';

const GenerationQueueListItem = ({ queueItem }) => (
    <tr>
        <td>##{queueItem.type}##</td>
        <td>##{queueItem.moreDetails}##</td>
        <td>##{queueItem.status}##</td>
        <td>
            ##{moment(queueItem.createdOn).format('DD/MM/YYYY  hh:mm:ss a')}##
        </td>
        <td />
    </tr>
);

export default GenerationQueueListItem;
