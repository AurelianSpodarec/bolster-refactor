import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ACTIVITY_LOG_REFERENCE_VALUES } from 'constants/companyAdmin/enums';

import EditActivityLogForm from '../presentational/EditActivityLogForm';

const EditActivityLogFormContainer = ({ settings }) => {
    const [form, handleChange] = useState({});

    useEffect(() => {
        let initialState = {};

        settings.forEach(setting => {
            const key = `reference-${setting.referenceType}-action-${setting.actionType}`;

            initialState[key] = setting.isEnabled;
        });

        handleChange({
            ...initialState,
        });
    }, []);

    return (
        <EditActivityLogForm
            settings={settings}
            form={form}
            handleFormChange={handleFormChange}
            sections={getSections()}
        />
    );

    function getSections() {
        const sections = Object.keys(ACTIVITY_LOG_REFERENCE_VALUES).map(val => {
            const name = ACTIVITY_LOG_REFERENCE_VALUES[val];

            return {
                id: +val,
                name,
            };
        });

        return sections;
    }

    function handleFormChange(name, value) {
        handleChange({
            ...form,
            [name]: value,
        });
    }
};

export default connect()(EditActivityLogFormContainer);
