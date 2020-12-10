import React from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const NewFeaturesList = ({ newFeatures, showDeleteModal, showEditModal }) => {
    return [...newFeatures]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .map(newFeature => {
            const { id, title, fullDescription, publishDate } = newFeature;
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>
                        <div
                            className="wysiwyg generic-table center"
                            dangerouslySetInnerHTML={{ __html: fullDescription }}
                        />
                    </td>
                    <td>
                        <DateTimeContainer
                            date={moment.utc(publishDate).format('YYYY-MM-DDTHH:mm:ss')}
                        />
                    </td>
                    <td>
                        <Link to={`/admin/new-features/${id}`} className="button blue">
                            <i className="fa fa-eye fa-fw" />
                            View
                        </Link>
                        <button className="button yellow" onClick={() => showEditModal(newFeature)}>
                            <i className="fa fa-edit fa-fw" />
                            Edit
                        </button>
                        <button className="button red" onClick={() => showDeleteModal(id)}>
                            <i className="fa fa-times fa-fw" />
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
};
export default NewFeaturesList;
