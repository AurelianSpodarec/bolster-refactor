import React from 'react';
import { Link } from 'react-router-dom';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    REPORT_FORMATS
} from 'constants/companyAdmin/enums';

const GenerationQueueListItem = ({ queueItem }) => (
    <tr>
        <td>{REPORT_FORMATS[queueItem.type]}</td>
        <td>{queueItem.moreDetails}</td>
        <td>{GENERATION_STATE_TEXT[queueItem.state]}</td>
        <td>
            <DateTimeContainer date={queueItem.createdOn} />
        </td>
        <td />
    </tr>
);

export default GenerationQueueListItem;
