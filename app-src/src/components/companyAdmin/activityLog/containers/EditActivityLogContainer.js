import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import fetchActivityLogSettings from 'actions/companyAdmin/activityLog/async/fetchActivityLogSettings';

import EditActivityLog from '../presentational/EditActivityLog';
import { ACTIVITY_LOG_REFERENCE_VALUES } from 'constants/companyAdmin/enums';

const EditActivityLogContainer = ({ fetchActivityLogSettings, settings, isFetching, error }) => {
    const [form, handleChange] = useState({
        test: false,
    });

    useEffect(() => {
        fetchActivityLogSettings();
    }, []);

    return (
        <EditActivityLog
            settings={settings}
            isFetching={isFetching}
            error={error}
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

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: { settings, isFetching, error },
    },
}) => ({
    settings,
    isFetching,
    error,
});

const mapDispatchToProps = {
    fetchActivityLogSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityLogContainer);
