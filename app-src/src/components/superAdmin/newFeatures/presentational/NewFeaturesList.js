import React from 'react';
import moment from 'moment';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { Link } from 'react-router-dom';

const NewFeaturesList = ({ newFeatures, showDeleteModal, showEditModal }) => {
    return newFeatures.map(newFeature => (
        <tr key={newFeature.id}>
            <td>{newFeature.title}</td>
            <td>{newFeature.shortDescription}</td>
            <td>
                {' '}
                <DateTimeContainer
                    date={moment(newFeature.publishDate).format('YYYY-MM-DDTHH:mm:ss')}
                />
            </td>
            <td>
                <Link to={`/admin/new-features/${newFeature.id}`} className="button blue">
                    <i className="fa fa-eye fa-fw" />
                    View
                </Link>
                <button className="button yellow" onClick={() => showEditModal(newFeature)}>
                    <i className="fa fa-edit fa-fw" />
                    Edit
                </button>
                <button className="button red" onClick={() => showDeleteModal(newFeature.id)}>
                    <i className="fa fa-times fa-fw" />
                    Delete
                </button>
            </td>
        </tr>
    ));
};
export default NewFeaturesList;
