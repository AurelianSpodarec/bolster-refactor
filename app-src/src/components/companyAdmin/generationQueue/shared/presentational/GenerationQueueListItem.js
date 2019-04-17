import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const GenerationQueueListItem = ({ queueItem }) => (
    <tr>
        <td>##{queueItem.type}##</td>
        <td>##{queueItem.moreDetails}##</td>
        <td>##{queueItem.status}##</td>
        <td>
            <DateTimeContainer date={queueItem.createdOn} />
        </td>
        <td />
    </tr>
);

export default GenerationQueueListItem;
