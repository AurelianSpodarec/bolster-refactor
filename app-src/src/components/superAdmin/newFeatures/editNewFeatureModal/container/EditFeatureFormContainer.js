import React from 'react';

import FeatureForm from '../../presentational/FeatureForm';
import { useForm } from 'helpers/hooks';
import { connect } from 'react-redux';

const EditFeatureFormContainer = ({ feature, hideModal }) => {
    const [formData, handleChange] = useForm({
        title: feature.title,
        shortDescription: feature.shortDescription,
        fullDescription: feature.fullDescription,
        publishDate: new Date(feature.publishDate),
    });

    return <FeatureForm handleChange={handleChange} form={formData} />;
};

export default connect(null, null)(EditFeatureFormContainer);
