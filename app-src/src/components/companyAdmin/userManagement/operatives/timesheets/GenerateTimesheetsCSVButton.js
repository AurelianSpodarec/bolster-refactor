import React from 'react';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch } from 'react-redux';
import { GENERATE_TIMESHEET_REPORT } from 'constants/shared/modalTypes';

const GenerateTimesheetsCSVButton = () => {
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(
            showModal(GENERATE_TIMESHEET_REPORT, {
                fromDateInclusive: null,
                toDateInclusive: null,
                serviceID: null,
                hierarchyID: null,
                pinIDs: null,
            }),
        );
    };

    return (
        <ActionButton
            size="medium"
            onClick={handlePress}
            text="Export CSV"
            icon="file-csv"
            isPosting={false}
        />
    );
};

export default GenerateTimesheetsCSVButton;
