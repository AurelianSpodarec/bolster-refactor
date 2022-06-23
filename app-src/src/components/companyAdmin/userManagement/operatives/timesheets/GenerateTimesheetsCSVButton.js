import postGenerateTimesheetsCSV from 'actions/companyAdmin/timesheets/async/postGenerateTimesheetsCSV';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';

const GenerateTimesheetsCSVButton = () => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const postBody = {};
        dispatch(postGenerateTimesheetsCSV(postBody));
    };

    return <ActionButton size="medium" onClick={handleSubmit} text="Export CSV" icon="file-csv" />;
};

export default GenerateTimesheetsCSVButton;
