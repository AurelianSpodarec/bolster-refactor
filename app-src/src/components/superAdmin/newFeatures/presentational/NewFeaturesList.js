import React from 'react';
import moment from 'moment';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';

const NewFeaturesList = ({ newFeatures }) =>
    newFeatures.map(newFeature => (
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
                <Link to={`/`} className="button">
                    <i className="fa fa-eye fa-fw" />
                    View
                </Link>
                <button
                    className="button red"
                    // onClick={() => removeCustomField(id)}
                >
                    <i className="fa fa-times fa-fw" />
                    Remove
                </button>
            </td>
        </tr>
    ));
export default NewFeaturesList;
