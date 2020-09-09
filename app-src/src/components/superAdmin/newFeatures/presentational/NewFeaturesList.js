import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const NewFeaturesList = ({ newFeatures }) =>
    newFeatures.map(newFeature => (
        <tr key={newFeature.id}>
            <td>{newFeature.title}</td>
            <td>{newFeature.shortDescription}</td>
            <td>
                {' '}
                <DateTimeContainer date={newFeature.publishDate} />
            </td>
        </tr>
    ));
export default NewFeaturesList;
