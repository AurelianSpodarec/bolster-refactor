import React from 'react';
import moment from 'moment';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const RecentlyExtendedList = ({ recentlyExtended }) => {
    return [...recentlyExtended]
        .sort((a, b) => new Date(b.extendedOn) - new Date(a.extendedOn))
        .map(extension => (
            <tr key={extension.id}>
                <td>{extension.companyName}</td>
                <td>{extension.hierarchy}</td>
                <td>
                    <DateTimeContainer
                        date={moment.utc(extension.extendedOn).format('YYYY-MM-DDTHH:mm:ss')}
                    />
                </td>
                <td>
                    <DateTimeContainer
                        date={moment.utc(extension.oldExpiryDate).format('YYYY-MM-DDTHH:mm:ss')}
                    />
                </td>
                <td>
                    <DateTimeContainer
                        date={moment.utc(extension.newExpiryDate).format('YYYY-MM-DDTHH:mm:ss')}
                    />
                </td>
                <td>{extension.extensionReason}</td>
            </tr>
        ));
};
export default RecentlyExtendedList;
