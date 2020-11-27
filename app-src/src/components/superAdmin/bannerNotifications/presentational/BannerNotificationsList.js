import React from 'react';
import moment from 'moment';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const BannerNotificationList = ({ bannerNotifications, showDeleteModal, showEditModal }) => {
    return [...bannerNotifications]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .map(bannerNotification => (
            <tr key={bannerNotification.id}>
                <td>{bannerNotification.name}</td>
                <td className="wide-row">
                    <div dangerouslySetInnerHTML={{ __html: bannerNotification.content }}></div>
                </td>
                <td>
                    <DateTimeContainer
                        date={moment
                            .utc(bannerNotification.startDate)
                            .format('YYYY-MM-DDTHH:mm:ss')}
                    />
                </td>
                <td>
                    <DateTimeContainer
                        date={moment.utc(bannerNotification.endDate).format('YYYY-MM-DDTHH:mm:ss')}
                    />
                </td>
                <td className="center-align">{bannerNotification.colour.text}</td>

                <td>
                    <button
                        className="button yellow"
                        onClick={() => showEditModal(bannerNotification)}
                    >
                        <i className="fa fa-edit fa-fw" />
                        Edit
                    </button>
                    <button
                        className="button red"
                        onClick={() => showDeleteModal(bannerNotification.id)}
                    >
                        <i className="fa fa-times fa-fw" />
                        Delete
                    </button>
                </td>
            </tr>
        ));
};
export default BannerNotificationList;
